const errorName = {
  50397443: 'CPU的RTC损坏',
  33751095: '文件已存在',
  33751103: '无法格式化这种类型的磁盘',
  33751186: '花样文件太大,超过100万针系统无法处理',
  50593804: 'CRC校验错误',
  33816818: '读花板数据错误',
  33816588: '花样信息管理初始化错误',
  33619969: '预取指令异常错误',
  33619970: '数据异常错误',
  33619971: '未知指令异常错误',
  33619972: '软中断异常错误',
  34209794: '花样扩展编织参数错误已设置为默认值',
  34209795: '工作参数错误已设置为默认值',
  34209796: '系统参数错误已设置为默认值',
  34209797: '掉电续织保存参数错误',
  34209798: '时间差参数错误',
  34209799: '当前编织花样号存储错误',
  34209800: '固定参数错误已设置为默认值',
  34209801: '中位机fram参数错误已设置为默认值',
  34340865: '花样参数已经被修正',
  50921474: '前针床撞针报警',
  50921476: '24V电压异常报警',
  50921477: '15V电压异常报警',
  50921478: '天线台大纱结报警',
  50921479: '天线台小纱结报警',
  50921480: '机头零位传感器故障，请检查传感器接线及安装',
  50921481: '主轴左电磁限位开关报警',
  50921482: '摇床电磁限位开关报警',
  50921483: '天线台断线报警',
  50921484: '落布不良报警',
  50921485: '右收线报警',
  50921486: '左收线报警',
  50921487: '倒卷布报警',
  50921488: '卷布辊限位开关报警',
  50921489: '摇床机械式限位开关报警',
  50921490: '机头左右限位',
  50921492: '前床探针报警',
  50921588: '探针报警右机头',
  50921495: '电机驱动板24V电源报警',
  50921591: '电机驱动板24V电源报警右机头',
  50921497: '纱嘴处于释放状态，不能拉杆',
  50921498: '花样数据不完整，不能拉杆',
  50921499: '急停按钮被按下的情况下拉杆',
  50921500: 'Head comm error',
  50921596: 'Head comm error 右机头',
  50921501: 'Head dir error',
  50921597: 'Head dir error 右机头',
  50921502: '摇床复位错误 ',
  50921503: 'Main serve error ',
  50921504: 'Yaochuang serve error ',
  50921505: '中位机CNT数据错误 ',
  50921506: 'CAN0 bus error ',
  50921602: 'CAN1 bus error ',
  50921618: 'CAN2 bus error  ',
  50921507: '机头箱12V报警 ',
  50921508: '机头箱CZ069控制错误报警',
  50921509: '机头箱CZ069电源错误报警',
  50921510: '机头箱CZ069正24V电源报警',
  50921511: '机头箱CZ069负24V电源报警',
  50921512: '机头箱CZ068控制错误报警',
  50921513: '机头箱CZ068电源错误报警',
  50921514: '机头箱CZ068正24V电源报警',
  50921515: '机头箱CZ068负24V电源报警',
  50921603: '机头12V报警 右机头',
  50921604: '机头箱CZ069控制错误报警 右机头',
  50921605: '机头箱CZ069电源错误报警 右机头',
  50921606: '机头箱CZ069正24V电源报警 右机头',
  50921607: '机头箱Z069负24V电源报警 右机头',
  50921608: '机头箱CZ068控制错误报警 右机头',
  50921609: '机头箱CZ068电源错误报警 右机头',
  50921610: '机头箱CZ068正24V电源报警 右机头',
  50921611: '机头箱CZ068负24V电源报警 右机头',
  50921516: '主轴初始化错误',
  17367041: '编织完成指定件数',
  17367042: '指定行停车',
  17367043: '单片编织完成',
  17367045: '已达设定件数，禁止拉杆',
  50921518: '下位机度目电机丢转错误',
  50921614: '度目丢转错误 右机头',
  50921520: '后床撞针报警',
  50921521: 'CNT纱嘴过多',
  50921522: '主轴编码器异常',
  50921524: '后床探针报警',
  50921620: '后床探针报警 右机头',
  50921531: '纱嘴号超最大范围错误',
  50921532: '纱嘴号超最大范围错误',
  50921538: '驱动器运行方向与实际方向不同',
  50921539: '驱动器换向错误',
  50921541: '工位丢转错误',
  50921544: '编码器检测错误',
  50921545: '左机头动态度目电机错误',
  50921641: '右机头动态度目电机错误',
  50921637: '工位丢转错误  右机头',
  50921640: '编码器检测错误 右机头',
  50921642: '机头命令间隔太短',
  50921643: '收到错误的机头命令',
  50921546: '中位机软件与下位机不匹配',
  50921547: '下位机CPLD异常',
  50921621: '中位机软件与下位机不匹配（右机头）',
  50921552: '花样传输CNT校验和错误',
  50921553: '花样传输SEC校验和错误',
  50921554: '花样传输PAT数据内存分配错误',
  50921555: '花样传输CNT数据内存分配错',
  50921556: '花样传输SEC数据内存分配错误',
  50921557: '编织中PAT文件大小错误',
  50921558: '编织中CNT文件大小错误',
  50921565: '度目电机错误',
  50921566: '工位电机错误',
  50921567: '生克电机错误',
  50921568: '主轴右电磁限位开关报警',
  50921573: '同一时间太多电磁铁动作',
  50921574: '下位机系统过流',
  50921570: '左系统初始化错误',
  50921571: '中系统初始化错误',
  50921572: '右系统初始化错误',
  50921937: '中系统繁忙报警',
  50921682: '机头箱12V报警',
  50921683: '机头箱CZ069控制错误报警',
  50921684: '机头箱CZ069电源错误报警',
  50921685: '电机驱动板24V电源报警',
  50921686: '机头箱CZ069正24V电源报警',
  50921687: '机头箱CZ069负24V电源报警',
  50921688: '机头箱CZ068控制错误报警',
  50921689: '机头箱CZ068电源错误报警',
  50921690: '机头箱CZ068正24V电源报警',
  50921691: '机头箱CZ068负24V电源报警',
  50921692: '中位机软件与下位机不匹配',
  50921693: '下位机CPLD异常',
  50921694: '右系统指令报警',
  50922207: '右系统繁忙报警',
  50921696: '机头箱12V报警',
  50921697: '机头箱CZ069控制错误报警',
  50921698: '机头箱CZ069电源错误报警',
  50921699: '电机驱动板24V电源报警',
  50921700: '机头箱CZ069正24V电源报警',
  50921701: '机头箱CZ069负24V电源报警',
  50921702: '机头箱CZ068控制错误报警',
  50921703: '机头箱CZ068电源错误报警',
  50921704: '机头箱CZ068正24V电源报警',
  50921706: '中位机软件与下位机不匹配',
  50921707: '下位机CPLD异常',
  50921708: '同一时间太多电磁铁动作',
  50921709: '同一时间太多电磁铁动作',
  50921712: '电磁铁传感器检测',
  17367281: '请启用副罗拉',
  50921722: '选针器短路',
  50921723: '选针器电磁铁开路报警',
  50921724: '纱嘴短路',
  50921725: '纱嘴电磁铁开路报警',
  50921726: '工位短路',
  50921727: '工位电磁铁开路报警',
  50921648: '主轴驱动器伺服电机编码器错误',
  50921649: '主轴驱动器过流',
  50921650: '主轴驱动器过压',
  50921651: '主轴驱动器位置过超',
  50921652: '主轴驱动器EEPROM错误',
  50921653: '主轴驱动器电子齿轮比设置错误',
  50921654: '主轴驱动器过载',
  50921671: '主轴过温',
  50921672: '主轴驱动器软过流',
  50921673: '主轴编码器邋AB相位错误',
  50921695: '低压报警',
  50921714: '压脚电机丢转错误',
  50921715: '压脚电机复位错误',
  50921716: '1号和2号纱嘴电机同时使用错误',
  50921717: '3号和4号纱嘴电机同时使用错误',
  50921718: '5号和6号纱嘴电机同时使用错误',
  50921719: '工位电机复位错误',
  51052545: 'PREP初始化错误',
  50921731: '主罗拉硬件过流',
  50921732: '主罗拉A项软件过流',
  50921733: '主罗拉B项软件过流',
  50921734: '主罗拉A项未接',
  50921735: '主罗拉B项未接',
  50921736: '主罗拉MOS过流',
  50921737: '主罗拉A项ADC采样基准故障',
  50921738: '主罗拉A项ADC采样基准故障',
  50921739: '主罗拉AB项ADC采样基准故障',
  50921740: '伺服器通讯错误',
  50921741: '编码器超限',
  50921742: '主轴针数不连续报警',
  50921743: '未收到主轴补偿编码器数值',
  50921744: '主伺服速度计算错误',
  50921745: '母线电压为0',
  50921746: '主伺服 A项AD错误',
  50921747: '主伺服 B项AD错误',
  50921748: '主伺服曲线时间设置错误',
  50921749: '主伺服软限位报警',
  50921750: '60ms未收到变化的针位置',
  50921751: '摇床时，未收到上次摇床完成的指令',
  50921752: '主轴500ms内未收到点名指令',
  50921753: '摇床失去联系',
  50921754: '步进罗拉失去联系',
  50921755: '主轴最大限位报警',
  50921756: '进入编织区时未收到摇床到位信号',
  50921757: '驱动板散热片风扇未接或故障',
  50921758: '驱动板24V过流',
  50921759: '控制箱风扇未接或故障',
  50921760: '摇床硬件过流',
  50921761: '摇床软件过流',
  50921762: '摇床过载',
  50921763: '摇床位置超差',
  50921764: '摇床散热器过温',
  50921765: '摇床编码器AB故障',
  50921766: '摇床母线过压',
  50921767: '摇床A项ADC采样基准故障',
  50921768: '摇床B项ADC采样基准故障',
  50921769: '摇床AB项ADC采样基准故障',
  50921770: '摇床电机编码器未接',
  50921771: '摇床电机超速',
  50921772: '摇床限位错误',
  50921773: '摇床复位超时',
  50921774: '摇床复位时位置过超',
  50921775: '摇床CAN 发送超时',
  50921776: '副罗拉电机硬件过流',
  50921777: '摇床复位超时',
  50921778: '驱动板24V报警',
  50921779: '驱动板感应器12V报警',
  50921780: '驱动板5V报警',
  50921781: '驱动板3.3V报警',
  50921782: '驱动板15V报警',
  50921783: '驱动板-5V报警',
  50921784: '驱动板CPU12V报警',
  50921785: '机头12V报警',
  50921786: '机头-24V报警',
  50921792: '下位机生克板失去联系',
  50921793: '下位机左系统机头板失去联系',
  50921794: '下位机中系统机头板失去联系',
  50921795: '下位机右系统机头板失去联系',
  50921796: '下位机四系统机头板失去联系',
  50921797: '下位机电机沙嘴1失去联系',
  50921798: '下位机电机沙嘴2失去联系',
  50921799: '下位机电机沙嘴3失去联系',
  50921800: '下位机电机沙嘴4失去联系',
  50921801: '送纱器板失去联系',
  50921802: '驱动板失去联系',
  50921808: '电机纱嘴忙错误',
  50921809: '工位电机无法动作完成',
  50921810: '未收到工位电机位置查询信息',
  50921811: '后工位电机位置错误',
  50921812: '未收到主轴停车反馈指令',
  50921813: '未收到主轴启动反馈指令',
  50921814: '主轴连续两次收到启动指令',
  50921815: 'CMD指令错误，速度环与位置环指令混用',
  50921816: '前工位电机位置错误',
  50922240: '送纱器过流报警',
  50922241: '左送纱器错误',
  50922242: '右送纱器错误',
  50922244: '储纱器过流',
  50922245: '左储纱器错误',
  50922246: '右储纱器错误',
  50922496: '右机头选针器过流',
  50922497: '右机头选针器开路',
  50922498: '右机头纱嘴过流',
  50922499: '右机头纱嘴电磁铁开路',
  50922500: '右机头工位电磁铁过流',
  50922501: '右机头工位电磁铁开路',
  50922502: '右机头度目电机错误',
  50922503: '右机头生克电机错误',
  50922504: '右机头命令间隔太短',
  50922505: '右机头错误的机头指令',
  50922506: '右机头电磁铁感应器错误',
  50922507: '右机头电机沙嘴复位错误',
  50922508: '右机头电机沙嘴丢转错误',
  50922509: '右机头压脚电机丢转',
  50922510: '右机头工位电机丢转',
  50922511: '右机头电机沙嘴忙',
  50922753: '点名命令没有发送出去',
  50922754: '换向电机复位错误',
  50922755: '换向电机丢转错误',
  50922756: '换向电机复位错误',
  50922757: '换向电机丢转错误',
  67698689: '起底中，发送 罗拉开合命令超时',
  67698690: '起底中，发送 起底板正常工作命令超时',
  67698691: '起底中，剪刀1错误',
  67698692: '起底中，剪刀2错误',
  67698693: '起底中，夹子1错误',
  67698694: '起底中，夹子2错误',
  67698695: '起底中，夹子3错误',
  67698696: '起底中，夹子4错误',
  67698697: '起底中，起底编码器错误',
  67698698: '起底中，起底板完成，拉杆开始落布',
  67698699: '起底中，织物未通过',
  67698700: '起底中，起底24V报警',
  67698701: '起底中，起底12V报警',
  67698702: '起底中，起底挂布错误',
  67698703: '起底中，起底脱圈错误',
  67698704: '起底板安全位错误',
  67698705: '起底复位错误',
  67698706: '起底复合针挂布错误',
  67698707: '起底复合针脱圈错误',
  67698708: '起底板最小编码报警',
  67698709: '起底板最大编码器报警',
  67698710: '罗拉未打开就控制起底板上升',
  67698711: '织物未通过超时',
  67698713: '起底板工作完成错误',
  67698714: '起底中，起底板复位超时',
  67698715: '罗拉打开超时，请复位',
  67698717: '起底板高于安全位',
  67698718: '起底板提前运行到达脱布位错误',
  67698719: '沙嘴在初始位置，不必踢沙嘴',
  67698720: '副罗拉打开超时',
  67698721: '副罗拉打开错误',
  67698722: '副罗拉关闭错误',
  67698723: '起底板初始位置不在20000，请手动修改',
  67698724: '不支持两片起底的花样',
  67698725: '弹力纱断纱报警',
  67698726: '打版软件版本跟系统版本不匹配',
  67698727: '起底板脱圈后,脱圈编码器错误',
  50921710: '电机沙嘴丢转错误',
  50921711: '电机纱嘴复位错误',
};

export default errorName;
