import renderToDOM from '../utils/renderToDom';
import { houses, students, voldysArmy } from '../utils/data';
import filterButtons from '../components/filterButtons';
import studentAreas from '../components/studentAreas';
import header from '../components/header';
import sortingButton from '../components/sortButton';
import '../styles/main.scss';
import formHTML from '../components/formHTML';
import studentCards from '../components/studentCards';

const divId = '#app';

// ********** HTML Components  ********** //
// the basic HMTL structure of app
const htmlStructure = () => {
  const htmlDomString = `
    <div id="header-container" class="header mb-3"></div>
    <div id="form-container" class="container mb-3 text-center"></div>
    <div id="filter-container" class="container mb-3"></div>
    <div id="student-container" class="container d-flex"></div>
    `;

  renderToDOM('#app', htmlDomString);
};

// Create a new ID for the students
const createId = (array) => {
  if (array.length) {
    const idArray = array.map((el) => el.id);
    return Math.max(...idArray) + 1;
  }
  return 0;
};

const studentsOnDom = (array, house = 'Hogwarts') => {
  let studentDomString = '';
  if (!array.length) {
    studentDomString += `NO ${house.toUpperCase()} STUDENTS`;
  }

  students.forEach((student) => {
    studentDomString += studentCards(student, divId);
  });
  renderToDOM(divId, studentDomString);
};

const sortStudent = (e) => {
  e.preventDefault();
  const sortingHat = houses[Math.floor(Math.random() * houses.length)];
  // create the new student object
  if (e.target.id === 'sorting') {
    const student = document.querySelector('#student-name');
    students.push({
      id: createId(students),
      name: students.value,
      house: sortingHat.house,
      crest: sortingHat.crest,
    });
    student.value = ''; // reset value of input
    studentsOnDom('#students', students);
  }
};

// add form to DOM on start-sorting click.
// Add events for form after the form is on the DOM
const renderForm = () => {
  renderToDOM('#form-container', formHTML);
  document.querySelector('#sorting').addEventListener('submit', sortStudent);
};

const renderFilterBtnRow = () => {
  renderToDOM('#filter-container', filterButtons);
};

const renderStudentAreas = () => {
  renderToDOM('#student-container', studentAreas);
};

const events = () => {
  // get form on the DOM on button click
  document.querySelector('#start-sorting').addEventListener('click', () => {
    // put html elements on the DOM on click
    renderForm(); // form
    renderFilterBtnRow(); // filter buttons
    renderStudentAreas(); // students and voldy's army divs
  });

  // target expel buttons to move to voldys army
  document
    .querySelector('#student-container')
    .addEventListener('click', (e) => {
      if (e.target.id.includes('expel')) {
        const [, id] = e.target.id.split('--');
        const index = students.findIndex(
          (student) => student.id === Number(id)
        );

        // move from one array to another
        voldysArmy.push(...students.splice(index, 1));
        // get both sets of students on the DOM
        studentsOnDom('#students', students);
        studentsOnDom('#voldy', voldysArmy);
      }
    });

  // target filter buttons on Dom
  document.querySelector('#filter-container').addEventListener('click', (e) => {
    if (e.target.id.includes('filter')) {
      // eslint-disable-next-line no-shadow
      const [, house] = e.target.id.split('--');

      if (house === 'all') {
        studentsOnDom('#students', students);
      } else if (house) {
        const filter = students.filter((student) => student.house === house);
        studentsOnDom('#students', filter, house);
      }
    }
  });
};

const renderHeader = () => {
  renderToDOM('#header-container', header);
};

const renderSortingBtn = () => {
  renderToDOM('#form-container', sortingButton);
};

// ********** LOGIC  ********** //
// sorts student to a house and then place them in the students array

// has to be put on the DOM after form is on DOM, not before
// on form submit, sort student

const startApp = () => {
  htmlStructure(); // always load first
  renderSortingBtn();
  renderHeader();
  events(); // always load last
};

startApp();
