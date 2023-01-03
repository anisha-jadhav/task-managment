const state = {
  taskList: [],
};

//DOM - document object
//acess content of particular task
const taskContents = document.querySelector(".task__contents");

//acess body of task
const taskModal = document.querySelector(".task__modal__body");

const htmlTaskContent = ({ id, title, description, type, url }) => `
        <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
            <div class="card shadow-sm task__card">
                    <div class="card-header d-flex gap-2 justify-content-end task__card__header" >
                    
                            <button type="button" class="btn btn-outline-info mr-2" name=${id}>
                            <i class="fas fa-pencil-alt" name=${id}> </i>
                            </button>
                            
                            <button
                            type="button"
                            class="btn btn-outline-danger mr-2"
                            name=${id}>
                            <i class="fas fa-trash-alt" name=${id}> </i>
                            </button>
                    </div>
                    <div class="card-body">
                            ${
                              url
                                ? `
                                      <img
                                      width="100%"
                                      src=${url}
                                      alt="card image caption"
                                      class="card-image-top md-3 rounded-lg"
                                      />
                                  `
                                : `
                                  <img
                                      width="100%"
                                      src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"
                                      alt="card image caption"
                                      class="img-fluid place__holder__image mb-3"
                                      />
                                  `
                            }

                            <h4 class="task__card__title">${title}</h4>
                            
                            <p class="description trim-3-lines text-muted" data-gram_editor="false"> ${description}</p>
                            
                            <div class="tags text-white d-flex flex-wrap">
                                <span class="badge bg-primary m-1">${type}</span>
                            </div>
                        </div> 

                        <div class="card-footer">
                            <button
                                type="button"
                                class="btn btn-outline-primary float-right"
                                data-bs-toggle="modal"
                                data-bs-target="#showTask"
                                id= ${id}
                                onclick= 'openTask.apply(this, arguments)'
                            >    
                                Open Task
                            </button>
                        </div>
                    
            </div>
        </div>
`;

const htmlModalContent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return `
        <div id=${id}>
        ${
          url
            ? `
                  <img
                  width="100%"
                  src=${url}
                  alt="card image caption"
                  class="img-fluid place__holder__image mb-3"
                  />
              `
            : `
              <img
                  width="100%"
                  src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"
                  alt="card image caption"
                  class="img-fluid place__holder__image mb-3"
                  />
              `
        }
          <strong class= 'text-sm text-muted'> Created on ${date.toDateString()}</strong>
          <h2 class='my-3'>${title}</h2>
          <p class= 'lead'>
            ${description}
          </p>
        </div>
        
    `;
};

//stores tasks in local storage
const updateLocalStorage = () => {
  localStorage.setItem(
    "tasks",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};

// convert the data back to website when page refresh
const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.tasks);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  });
};

//used when we click save changes button and the task card will gets created
const handleSubmit = (event) => {
  const id = `${Date.now()}`;
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDesc").value,
    type: document.getElementById("tags").value,
  };

  if (input.title === "" || input.description === "" || input.type === "") {
    return alert("Please fill all the fields");
  }

  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({
      ...input,
      id,
    })
  );

  state.taskList.push({ ...input, id });
  updateLocalStorage();
};

const openTask = (e) => {
  if (!e) e = window.event;

  const getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
};
