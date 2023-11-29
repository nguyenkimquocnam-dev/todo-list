

const formAdd = document.querySelector('#form-add');
const inputAdd = formAdd.querySelector('.input');
let tasks = [];

// Xử lý việc submit form khi add
formAdd.addEventListener('submit', (e) => {
    // Ngăn cản hành vi mặc định của form (chuyển trang)
    e.preventDefault();

    // Lấy dữ liệu từ input add
    let valueTask = inputAdd.value.trim(); // Xóa khoảng cách 2 đầu chuỗi trước khi gửi đi

    // Kiểm tra có dữ liệu thì mới làm tiếp
    if (valueTask) {
        // Add data
        addTask(valueTask);

        // Clear input add
        inputAdd.value = '';
    } 
    // Nếu không có dữ liệu thì show alert
    else {
        alert('Pleased enter your todo!');
    }
})

function addTask(value) {
    // Tạo ra đối tượng task mới để lưu trử task vừa được tạo
    const newTask = {
        id: Date.now(),
        name: value,
        isDone: false,
        isEdit: false
    }

    // Đẩy task vừa được tạo vào mảng
    tasks.push(newTask);

    // Render ra giao diện
    renderTasks();
}

// Hàm xử lý render giao diện 
function renderTasks() {
    const tasksElement = document.querySelector('.todos');
    tasksElement.innerHTML = '';

    tasks.forEach((task) => {
        const { id, name, isDone, isEdit } = task;

        // todo-item
        const itemElement = document.createElement('li');
        itemElement.id = id;
        itemElement.className = `todos__item ${isDone ? 'todos__item--done' : ''}`;
        
        // label
        const labelElement = document.createElement('span');
        labelElement.className = 'todos__label';
        labelElement.innerText = name;

        // actions wrap
        const actionsElement = document.createElement('div');
        actionsElement.className = 'todos__action';

        // button delete
        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn btn--red';
        btnDelete.innerText = 'Delete';
        // Xử lý khi ấn nút Delete
        btnDelete.addEventListener('click', () => {
            deleteTaskById(id);
        })

        // Edit Form & Input Edit
        const inputEdit = document.createElement('input');
        inputEdit.className = 'input input--edit';
        inputEdit.value = name;

        const formEdit = document.createElement('form');
        formEdit.className = 'form form--edit';
        formEdit.addEventListener('submit', (e) => {
            e.preventDefault();
            if (inputEdit.value) {
                updateValueLabelById(id, inputEdit.value);
                changeViewEditById(id);
                inputEdit.value = '';
            }
        })

        // Button Save
        const btnSave = document.createElement('button');
        btnSave.className = 'btn btn--blue';
        btnSave.type = 'submit';
        btnSave.innerText = 'Save';
        
        // button edit
        const btnEdit = document.createElement('button');
        btnEdit.className = 'btn btn--yellow';
        btnEdit.innerText = 'Edit';
        // Xử lý khi nhấn nút Edit
        btnEdit.addEventListener('click', () => {
            changeViewEditById(id);
        })
                
        // button done
        const btnDone = document.createElement('button');
        btnDone.className = `btn ${ !isDone ? 'btn--green' : 'btn--yellow' }`;
        btnDone.innerText = `${!isDone ? 'Done' : 'Undone'}`;
        // Xử lý khi ấn nút Done
        btnDone.addEventListener('click', () => {
            // Update lại trạng thái
            updateStatusTaskById(id);
        })

        // Render HTML
        if (isEdit) {
            formEdit.appendChild(inputEdit);
            formEdit.appendChild(btnSave);
            itemElement.appendChild(formEdit);
        } else {
            actionsElement.appendChild(btnDelete);
            !isDone && actionsElement.appendChild(btnEdit);
            actionsElement.appendChild(btnDone);

            itemElement.appendChild(labelElement);
            itemElement.appendChild(actionsElement);

        }
        tasksElement.appendChild(itemElement);
    })
}

// Hàm xử lý xóa task 
function deleteTaskById(id) {
    // Lọc ra những tasks khác id nhấn và gán lại cho mảng
    tasks = tasks.filter(task => task.id !== id);

    // Render lại giao diện
    renderTasks();
}

// Hàm xử lý cập nhật trạng thái done
function updateStatusTaskById(id) {
    // Nếu cùng id thì sẽ cập nhật lại trạng thái
    tasks = tasks.map((task) =>
        task.id === id ? {...task, isDone: !task.isDone} : task
    );

    // Render lại
    renderTasks();
}

function changeViewEditById(id) {
    // Nếu cùng id thì sẽ cập nhật lại trạng thái
    tasks = tasks.map((task) =>
        task.id === id ? { ...task, isEdit: !task.isEdit } : task
    );

    // Render lại
    renderTasks();
}

// Cập nhật lại giá trị cho task khi edit
function updateValueLabelById(id, valueUpdate) {
    tasks = tasks.map((task) =>
        task.id === id ? { ...task, name: valueUpdate} : task
    );

  // Render lại
  renderTasks();
}