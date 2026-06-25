function TaskCard({

  task,
  onDelete,
  onEdit

}) {

  return (

    <div className="card p-4 mb-3">

      <div className="d-flex justify-content-between">

        <h4>{task.title}</h4>

        <span className="badge bg-primary">

          {task.priority}

        </span>

      </div>

      <p className="mt-2">
        {task.description}
      </p>

      <p>

        <strong>Status:</strong>
        {" "}
        {task.status}

      </p>

      <p>

        <strong>Due Date:</strong>
        {" "}
        {task.due_date}

      </p>

      <div className="d-flex gap-2">

        <button
          className="btn btn-warning"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="btn btn-danger"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;