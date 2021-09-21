import Abstract from '../view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (conteiner, child, place) => {
  if(conteiner instanceof Abstract) {
    conteiner = conteiner.getElement();
  }

  if(child instanceof Abstract) {
    child = child.getElement();
  }

  switch(place) {
    case RenderPosition.AFTERBEGIN:
      conteiner.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      conteiner.append(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const replace = (newChild, oldChild) => {
  if(newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  if(oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  const parent = oldChild.parentElement;

  if((!parent) || (!newChild) || (!oldChild)) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }
  component.getElement().remove();
  component.removeElement();
};
