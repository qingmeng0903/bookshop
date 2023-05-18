import { v4 as uuidv4 } from 'uuid'
export const getUUId = () => {
  // 先从本地获取临时游客身份 (骚操作)
  let uuidtoken = localStorage.getItem('UUID')
  // 如果没有生成一个唯一的uuid,并存住到本地  (单例模式只有一个getUUId类的实例生成)
  if (!uuidtoken) {
    uuidtoken = uuidv4()
    localStorage.setItem('UUID', uuidtoken)
  }
  return uuidtoken
}
