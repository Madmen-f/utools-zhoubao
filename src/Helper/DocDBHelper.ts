import { ICommonEnt } from './../model/ICommonEnt';
import { ITypeEnt } from './../model/ITypeEnt';
import { IDocEnt } from '@/model/IDocEnt';
import { DBItem } from '@/types/utools';
import DBHelper from './DBHelper';

const DOC_DB_PRE_FIX = 'doc_';
const DB_DOC_INSTANCE = new DBHelper(DOC_DB_PRE_FIX);
export class DocDBHelper {
  static set(data: IDocEnt) {
    return DB_DOC_INSTANCE.set<IDocEnt>(data);
  }

  static setList(data: IDocEnt[]) {
    return DB_DOC_INSTANCE.setList<IDocEnt>(data);
  }

  static update(data: DBItem<IDocEnt>) {
    return DB_DOC_INSTANCE.update<IDocEnt>(data);
  }

  static get(fundId: string) {
    return DB_DOC_INSTANCE.get<IDocEnt>(fundId);
  }

  static getAll() {
    return DB_DOC_INSTANCE.getAll<IDocEnt>();
  }

  static del(fundId: string) {
    return DB_DOC_INSTANCE.del<IDocEnt>(fundId);
  }
}

const TYPE_DB_PRE_FIX = 'type_';
const DB_TYPE_INSTANCE = new DBHelper(TYPE_DB_PRE_FIX);
export class TypeDBHelper {
  static set(data: ITypeEnt) {
    return DB_TYPE_INSTANCE.set<ITypeEnt>(data);
  }

  static setList(data: ITypeEnt[]) {
    return DB_TYPE_INSTANCE.setList<ITypeEnt>(data);
  }

  static update(data: DBItem<ITypeEnt>) {
    return DB_TYPE_INSTANCE.update<ITypeEnt>(data);
  }

  static get(fundId: string) {
    return DB_TYPE_INSTANCE.get<ITypeEnt>(fundId);
  }

  static getAll() {
    return DB_TYPE_INSTANCE.getAll<ITypeEnt>();
  }

  static del(fundId: string) {
    return DB_TYPE_INSTANCE.del<ITypeEnt>(fundId);
  }
}

const COMMON_DB_PRE_FIX = 'common_';
const DB_COMMON_INSTANCE = new DBHelper(COMMON_DB_PRE_FIX);
export class CommonDBHelper {
  static set(data: ICommonEnt) {
    return DB_COMMON_INSTANCE.set<ICommonEnt>(data);
  }

  static setList(data: ICommonEnt[]) {
    return DB_COMMON_INSTANCE.setList<ICommonEnt>(data);
  }

  static update(data: DBItem<ICommonEnt>) {
    return DB_COMMON_INSTANCE.update<ICommonEnt>(data);
  }

  static get(fundId: string) {
    return DB_COMMON_INSTANCE.get<ICommonEnt>(fundId);
  }

  static getAll() {
    return DB_COMMON_INSTANCE.getAll<ICommonEnt>();
  }

  static del(fundId: string) {
    return DB_TYPE_INSTANCE.del<ICommonEnt>(fundId);
  }
}