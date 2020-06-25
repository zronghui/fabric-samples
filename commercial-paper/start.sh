#!/bin/bash

# 路径定义
export FabricSamples=/root/fabric/fabric-samples
# 启动网络
cd $FabricSamples/basic-network || exit
./start.sh

# 查看各个 container 的日志
# cd $FabricSamples/commercial-paper/organization/magnetocorp/configuration/cli/
# ./monitordocker.sh net_basic
# ./monitordocker.sh net_basic <port_number> # 或者指定一个端口

# 启动一个 MagnetoCorp
cd $FabricSamples/commercial-paper/organization/magnetocorp/configuration/cli/ || exit
docker-compose -f docker-compose.yml up -d cliMagnetoCorp

# 智能合约
cd $FabricSamples/commercial-paper/organization/magnetocorp/contract || exit
docker exec cliMagnetoCorp peer chaincode install -n papercontract -v 0 -p /opt/gopath/src/github.com/contract -l node
docker exec cliMagnetoCorp peer chaincode instantiate -n papercontract -v 0 -l node -c '{"Args":["org.papernet.commercialpaper:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"

# 应用程序依赖项
cd $FabricSamples/commercial-paper/organization/magnetocorp/application/ || exit
npm install
# 钱包
node addToWallet.js
# 发行
node issue.js
