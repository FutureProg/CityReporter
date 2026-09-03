import { createDefine } from "fresh";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  shared: string;
}

export const define = createDefine<State>();


export const pickClassNames = (...args: (string | {[key: string]: boolean} )[]): string => {
  return args.flat()
      .map((val) => {
        if (typeof val === 'string') {
          return val;
        } else {
          return Object.entries(val)
            .filter(([_key, evaluation]) => evaluation)
            .map(([key, ]) => key);
        }
      })
      .flat()
      .join(' ');
}