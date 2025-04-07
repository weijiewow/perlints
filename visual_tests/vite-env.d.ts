/// <reference types="vite/client" />
// 告诉 TS 可以处理 .glsl 模块
declare module '*.glsl' {
  const value: string;
  export default value;
}
declare module '*.vert' {
  const value: string;
  export default value;
}

declare module '*.frag' {
  const value: string;
  export default value;
}
