// 系统状态状态返回
export interface IStateResp {
  os: Os,
  cpu: Cpu,
  ram: Ram,
  disk: Disk
}

export interface Os {
  goos: string
  numCpu: number
  compiler: string
  goVersion: string
  numGoroutine: number
}
export interface Cpu {
  cpus: number[],
  cores: number

}

export interface Ram {
  usedMb: number,
  totalMb: number,
  usedPercent: number
}

export interface Disk {
  usedMb: number,
  usedGb: number,
  totalMb: number,
  totalGb: number,
  usedPercent: number
}
