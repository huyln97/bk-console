export function createEnum<T extends { [P in keyof T]: P }>(o: T) {
  return o;
}
export type signInForm = {
  email: string;
  password: string;
};
