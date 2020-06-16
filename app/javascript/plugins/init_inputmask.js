import Inputmask from "inputmask";

const initInputmask = () => {
  const selector = document.getElementById("user_phone");
  if (selector) {
    const im = new Inputmask("(99) 99999-9999");
    im.mask(selector);
  }
};

export { initInputmask };