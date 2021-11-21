export const idlFactory = ({ IDL }) => {
  const GET = IDL.Record({ 'key' : IDL.Text, 'flag' : IDL.Nat });
  const Result_1 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Vec(IDL.Nat8)),
    'err' : IDL.Text,
  });
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
  const AssetExt = IDL.Record({
    'key' : IDL.Text,
    'file_extension' : FileExtension,
    'bucket_id' : IDL.Principal,
    'total_size' : IDL.Nat,
    'need_query_times' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'ok' : AssetExt, 'err' : IDL.Text });
  const Chunk = IDL.Record({
    'data' : IDL.Vec(IDL.Nat8),
    'digest' : IDL.Vec(IDL.Nat8),
  });
  const PUT = IDL.Variant({
    'init' : IDL.Record({
      'file_extension' : FileExtension,
      'chunk_number' : IDL.Nat,
      'chunk' : Chunk,
    }),
    'append' : IDL.Record({
      'key' : IDL.Text,
      'order' : IDL.Nat,
      'chunk' : Chunk,
    }),
  });
  const Bucket = IDL.Service({
    'canisterState' : IDL.Func([], [IDL.Text], ['query']),
    'get' : IDL.Func([GET], [Result_1], ['query']),
    'getAssetExt' : IDL.Func([IDL.Text], [Result], ['query']),
    'put' : IDL.Func([PUT], [Result], []),
    'setBufferCanister' : IDL.Func([IDL.Text], [], []),
    'wallet_receive' : IDL.Func([], [IDL.Nat], []),
  });
  return Bucket;
};
export const init = ({ IDL }) => { return []; };
