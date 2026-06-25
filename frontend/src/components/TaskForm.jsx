function TaskForm({

  form,
  handleChange,
  handleSubmit,
  editing

}) {

  return (

    <div className="card p-4 mb-4">

      <h3>

        {
          editing
          ? "Edit Task"
          : "Add Task"
        }

      </h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-control mb-3"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-3"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="due_date"
          className="form-control mb-3"
          value={form.due_date}
          onChange={handleChange}
        />

        <select
          name="status"
          className="form-control mb-3"
          value={form.status}
          onChange={handleChange}
        >

          <option>
            Pending
          </option>

          <option>
            In Progress
          </option>

          <option>
            Completed
          </option>

        </select>

        <select
          name="priority"
          className="form-control mb-3"
          value={form.priority}
          onChange={handleChange}
        >

          <option>
            Low
          </option>

          <option>
            Medium
          </option>

          <option>
            High
          </option>

        </select>

        <button className="btn btn-primary">

          {
            editing
            ? "Update Task"
            : "Add Task"
          }

        </button>

      </form>

    </div>
  );
}

export default TaskForm;