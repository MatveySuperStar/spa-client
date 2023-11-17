export const checkPhoneNumber = (number) => {
  const regPhone = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
  return regPhone.test(number);
}

