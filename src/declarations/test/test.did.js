export const idlFactory = ({ IDL }) => {
  const GET = IDL.Record({ 'key' : IDL.Text, 'flag' : IDL.Nat });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Vec(IDL.Nat8), 'err' : IDL.Text });
  const FileExtension = IDL.Variant({
    'aac' : IDL.Null,
    'avi' : IDL.Null,
    'doc' : IDL.Null,
    'gif' : IDL.Null,
    'jpg' : IDL.Null,
    'mp3' : IDL.Null,
    'mp4' : IDL.Null,
    'png' : IDL.Null,
    'ppt' : IDL.Null,
    'svg' : IDL.Null,
    'txt' : IDL.Null,
    'wav' : IDL.Null,
    'docs' : IDL.Null,
    'jpeg' : IDL.Null,
  });
  const Info = IDL.Record({
    'key' : IDL.Text,
    'file_extension' : FileExtension,
    'offset' : IDL.Nat,
    'total_size' : IDL.Nat,
    'need_query_times' : IDL.Nat,
  });
  const Result_1 = IDL.Variant({ 'ok' : Info, 'err' : IDL.Text });
  const Chunk = IDL.Record({
    'data' : IDL.Vec(IDL.Nat8),
    'digest' : IDL.Vec(IDL.Nat8),
  });
  const PUT = IDL.Variant({
    'final' : IDL.Record({ 'key' : IDL.Text, 'chunk' : Chunk }),
    'init' : IDL.Record({ 'file_extension' : FileExtension, 'chunk' : Chunk }),
    'append' : IDL.Record({ 'key' : IDL.Text, 'chunk' : Chunk }),
  });
  const AssetExt = IDL.Record({
    'key' : IDL.Text,
    'bucket_id' : IDL.Principal,
    'total_size' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'ok' : AssetExt, 'err' : IDL.Text });
  const Bucket = IDL.Service({
    'canisterState' : IDL.Func([], [IDL.Text], ['query']),
    'get' : IDL.Func([GET], [Result_2], ['query']),
    'getAssetInfo' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'put' : IDL.Func([PUT], [Result], []),
    'wallet_receive' : IDL.Func([], [IDL.Nat], []),
  });
  return Bucket;
};
export const init = ({ IDL }) => { return []; };
