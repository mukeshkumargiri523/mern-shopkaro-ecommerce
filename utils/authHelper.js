import bcrypt from "bcrypt";
export const hashPassword = async (password) => {
  try {
    const saltRounds = 8;
    const hashedPass = await bcrypt.hash(password, saltRounds);
    return hashedPass;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPass) => {
  return bcrypt.compare(password, hashedPass);
};
