class Code {
  constructor() {
    this.OK = 0;
    this.InternalError = -1; // 内部错误
    this.ServiceError = -2; // 服务错误
    this.NotAuthenticated = -3; // 不允许操作, 未授权, 1244
    this.NoSuchUser = -4; // 没有此用户, 1317
    this.UserExists = -5; // 用户已存在, 1316
    this.MemberInGroup = -6; // 用户已经在组中, 1320
    this.MemberNotInGroup = -7; // 用户不在组中, 1321
    this.LogonFailure = -8; // 用户名或者密码错误, 1326
    this.AccountDisable = -9; // 帐号已被冻结, 不允许登录; 1331
    this.NoUserSessionKey = -10; // 没有会话密钥, 或者密钥已过期; 1394
    this.NotLoggedOn = -11; // 不允许操作, 帐号未授权; 1245
    this.UserProfileLoad = -12; // 无法加载用户详情; 500
    this.PasswordTooShort = -13; // 密码太短, 不符合规范; 615
    this.PasswordTooRecent = -14; // 修改密码过于频繁; 616
    this.PasswordTooLong = -15; // 密码太长, 不符合规范; 657
    this.AccountExpired = -16; // 帐号已过期, 无法使用; 1793
    this.pPasswordMustChange = -17; // 强制重置密码, 重置密码后才允许登录; 1907
    this.BadUserName = -18; // 用户名错误, 不合法的用户名; 2202
    this.NetworkBusy = -19; // 网络繁忙, 稍后再试; 54
    this.UnexpectedNetworkError = -20; // 未知网络错误; 59
    this.NetworkAccessDenied = -21; // 网络访问被拒; 65
    this.NoNetwork = -22; // 没有网络; 1222
    this.GracefulDisconnect = -23; // 网络连接已断开; 1226
    this.ConnectionRefuse = -24; // 服务器拒绝网络连接; 1225
    this.NetworkUnreachable = -25; // 网络不可到达; 1231
    this.ConnectionAborted = -26; // 本机终止网络连接; 1236
    this.IncorrectAddress = -27; // 地址不正确, 无法使用; 1241
    this.InvalidData = -28; // 数据错误; 13
    this.NoData = -29; // 没有数据; 232
    this.InvalidToken = -30; // 无法识别、格式错误 或者 非法的token; 315
    this.DataChecksumError = -31; // 数据检验失败; 323
    this.DatabaseDoesNotExist = -32; // 数据库不存在; 1065
    this.BadConfiguration = -33; // 配置无效或者非法; 1610
    this.UnsupportedType = -34; // 不支持的数据类型; 1630
    this.InvalidDataType = -35; // 提供的数据类型无法识别 或者 非法的; 1804
    this.ResourceDataNotFound = -36; // 未找到资源, 如 图片无法找到; 1812
    this.DatabaseFailure = -37; // 数据操作失败, 不能读写数据库; 4313
    this.DatabaseFull = -38; // 数据库已满负载; 4314
    this.AppDataNotFound = -39; // 找不到应用程序的cache数据; 4400
    this.AppDataExpired = -40; // 应用程序的cache数据已超时; 4401
    this.AppDataCorrupt = -41; // 应用程序的cache数据已被损坏; 4402
    this.AppDataLimitExceeded = -42; // 应用程序的cache数据超出预留空间; 4403
    this.BadTokenType = -43; // token可被系统识别, 但用途错误, 当前应用无法使用; 1349
    this.TokenAlreadyInUse = -44; // token已被使用 或者 占用; 1375
    this.InvalidTime = -45; // 时间格式错误, 是无效 或者 非法的; 1901
    this.DataSourceProtocolError = -46; // 数据源协议错误; 8225
    this.NotSupported = -47; // 不支持的请求, 无法处理请求; 50
    this.Busy = -48; // 请求的资源已被占用; 170
    this.RequestAborted = -49; // 请求被中止; 1235
    this.NoToken = -50; // 请求协议中没有提供token; 1008
    this.InvalidEncryptAlgorithm = -51; // 非法的加密算法; 13873
    this.EncryptingPayloadFailure = -52; // 加密payload失败; 13866
    this.DecryptingPayloadFailure = -53; // 解密payload失败; 13867
    this.InvalidCertificateSignature = -54; // 非法的签名, 签名无法被应用识别; 13875
    this.UnHandledException = -55; // 程序存在未处理异常; 574
    this.ServiceRequestTimeout = -56; // 服务器处理请求超时; 1053
    this.ObjectAlreadyExists = -57; // 对象已存在 或者 已被占用; 5010
    this.ObjectInList = -58; // 对象已存在于列表中; 5011
    this.NotConnected = -59; // 网络连接不存在, 网络未连接; 2250
    this.EntryNotFound = -60; // 找不到Entry; 1761
    this.EntryAlreadyExists = -61; // Entry已存在, 或者被占用; 1760
    this.MissingData = -62; // 请求的数据不在缓存中, 缓存中未找到相应数据; 4052
    this.NotInitialized = -63; // 提供的对象未初始化;4054
    this.AlreadyInitialized = -64; // 提供的对象已完成初始化; 4055
    this.AlreadyCompleted = -65; // 操作已完成; 4060
    this.AccessDenied = -66; // 未授权, 拒绝访问; 5
    this.Empty = -67; // 为空, 没有值; 4306
    this.NotEmpty = -68; // 不为空, 有值; 4307
  }
}

var _instance = new Code()

module.exports = {
  Instance: _instance
}