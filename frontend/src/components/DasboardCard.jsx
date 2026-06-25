function DashboardCard({

  title,
  count

}) {

  return (

    <div className="col-md-4">

      <div className="card p-4 text-center">

        <h5>{title}</h5>

        <h2>{count}</h2>

      </div>

    </div>
  );
}

export default DashboardCard;