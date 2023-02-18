const renderToDOM = (divId1, content) => {
  const selectedDiv = document.querySelector(divId1);
  selectedDiv.innerHTML = content;
};

export default renderToDOM;
