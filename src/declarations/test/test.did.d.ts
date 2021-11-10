import type { Principal } from '@dfinity/principal';
export interface AssetExt {
  'key' : string,
  'bucket_id' : Principal,
  'total_size' : bigint,
}
export interface Bucket {
  'canisterState' : () => Promise<string>,
  'get' : (arg_0: GET) => Promise<Result_2>,
  'getAssetInfo' : (arg_0: string) => Promise<Result_1>,
  'put' : (arg_0: PUT) => Promise<Result>,
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
export interface Info {
  'key' : string,
  'file_extension' : FileExtension,
  'offset' : bigint,
  'total_size' : bigint,
}
export type PUT = { 'final' : { 'key' : string, 'chunk' : Chunk } } |
  { 'init' : { 'file_extension' : FileExtension, 'chunk' : Chunk } } |
  { 'append' : { 'key' : string, 'chunk' : Chunk } };
export type Result = { 'ok' : AssetExt } |
  { 'err' : string };
export type Result_1 = { 'ok' : Info } |
  { 'err' : string };
export type Result_2 = { 'ok' : Array<number> } |
  { 'err' : string };
export interface _SERVICE extends Bucket {}
