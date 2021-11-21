import type { Principal } from '@dfinity/principal';
export interface AssetExt {
  'key' : string,
  'file_extension' : FileExtension,
  'bucket_id' : Principal,
  'total_size' : bigint,
  'need_query_times' : bigint,
}
export interface Bucket {
  'canisterState' : () => Promise<string>,
  'get' : (arg_0: GET) => Promise<Result_1>,
  'getAssetExt' : (arg_0: string) => Promise<Result>,
  'put' : (arg_0: PUT) => Promise<Result>,
  'setBufferCanister' : (arg_0: string) => Promise<undefined>,
  'wallet_receive' : () => Promise<bigint>,
}
export interface Chunk { 'data' : Array<number>, 'digest' : Array<number> }
export type FileExtension = { 'aac' : null } |
  { 'avi' : null } |
  { 'doc' : null } |
  { 'gif' : null } |
  { 'jpg' : null } |
  { 'mp3' : null } |
  { 'mp4' : null } |
  { 'png' : null } |
  { 'ppt' : null } |
  { 'svg' : null } |
  { 'txt' : null } |
  { 'wav' : null } |
  { 'docs' : null } |
  { 'jpeg' : null };
export interface GET { 'key' : string, 'flag' : bigint }
export type PUT = {
    'init' : {
      'file_extension' : FileExtension,
      'chunk_number' : bigint,
      'chunk' : Chunk,
    }
  } |
  { 'append' : { 'key' : string, 'order' : bigint, 'chunk' : Chunk } };
export type Result = { 'ok' : AssetExt } |
  { 'err' : string };
export type Result_1 = { 'ok' : Array<Array<number>> } |
  { 'err' : string };
export interface _SERVICE extends Bucket {}
