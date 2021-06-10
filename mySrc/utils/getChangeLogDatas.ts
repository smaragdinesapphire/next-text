import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import { convertString2Arr, convertArr2String, compareVersionArr } from '../utils/versionUnits';

type LogIds = Array<string>;

export interface GetAllLogIds {
  (): LogIds;
}

const changeLogsDirectory = path.join(process.cwd(), '/mySrc/changeLogs');

const getAllLogIds: GetAllLogIds = () => {
  const fileNames = fs.readdirSync(changeLogsDirectory);

  return fileNames.map(fileName => fileName.replace(/\.md/, ''));
};

export interface ChangeLogData {
  id: string;
  contentHtml: string;
  [key: string]: string;
}

interface GetChangeLogData {
  (id: string): Promise<ChangeLogData>;
}

const getChangeLogData: GetChangeLogData = async id => {
  const fullPath = path.join(changeLogsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return { id, contentHtml, ...matterResult.data };
};

interface SortLogId {
  (logIds: LogIds): LogIds;
}

const sortLogId: SortLogId = (logIds = []) =>
  logIds
    .map(logId => convertString2Arr(logId))
    .sort((a, b) => compareVersionArr(a, b))
    .map(versionArr => convertArr2String(versionArr));

const getRange = (page: number, pitem: number): Array<number> => [(page - 1) * pitem, page * pitem - 1];

interface GetChangeLogDatasProps {
  page: number;
  pitem: number;
}

export interface ChangeLogDatas {
  total: number;
  data: Array<ChangeLogData>;
}

interface GetChangeLogDatas {
  (props: GetChangeLogDatasProps): Promise<ChangeLogDatas>;
}
const getChangeLogDatas: GetChangeLogDatas = ({ page, pitem }) => {
  const allLogIds = sortLogId(getAllLogIds());
  const total = allLogIds.length;
  const [minIndex, maxIndex] = getRange(page, pitem);

  return new Promise(resolve => {
    Promise.all(
      allLogIds.filter((logId, index) => index >= minIndex && index <= maxIndex).map(logId => getChangeLogData(logId))
    ).then(changeLogDatas => resolve({ total, data: changeLogDatas }));
  });
};

export default getChangeLogDatas;
