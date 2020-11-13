import '../../styles/pagination.css';
import GoalsHistoryModel from '../GoalsHistoryComponent/GoalsHistoryModel';
import formatSeconds from '../utils/formatSeconds';

class Pagination {
  constructor(length, res_per_page) {
    this.pagination = document.createElement('div');
    this.pagination.classList.add('pagination');
    this.length = length;
    this.per_page = res_per_page;

    this.pagination_elems = [];
  }

  get_widget() {
    if (Math.ceil(this.length / this.per_page) <= 1) {
      return this.pagination;
    }

    for (let i = 1; i <= Math.ceil(this.length / this.per_page); i++) {
      let page = document.createElement('span');
      page.innerText = i;
      this.pagination_elems.push(page);
    }

    this.pagination_elems[0].classList.add('active');

    for (let el of this.pagination_elems) {
      this.pagination.appendChild(el);
      el.addEventListener('click', () => {
        this.pagination_elems.forEach((el) => el.classList.remove('active'));
        el.classList.add('active');
        this.switch_page(el.innerText);
      });
    }

    return this.pagination;
  }

  get_table() {
    return this.table;
  }

  switch_page(page_number) {
    GoalsHistoryModel.fetchGoalsByPage(page_number).then((goals) =>
      this.change_table_content(goals)
    );
  }

  set_external_data(table, goals) {
    this.table = table;
    this.goals = goals;
  }

  change_table_content(goals) {
    let history = ``;

    for (let goal of goals) {
      const { title, created_at, goal_time, time_spent, expired } = goal;

      let percent = (time_spent / goal_time) * 100;

      let expiredStyle =
        expired === 1 && time_spent < goal_time
          ? 'style="color: #f32013;"'
          : '';
      history += `
      <tr ${expiredStyle}>
        <td data-label="Title">${title}</td>
        <td data-label="Created at">${created_at.split('T')[0]}</td>
        <td data-label="Goal Time">${formatSeconds(goal_time)}</td>
        <td data-label="Time spent">${formatSeconds(
          time_spent
        )}(${percent.toFixed(2)}%)</td>
        <td data-label="In progress">${expired === 0 ? 'Yes' : 'No'}</td>
      </tr>
      `;
    }

    this.table.innerHTML = `
    <thead>
      <tr>  
        <th>Title</th>
        <th>Created at</th>
        <th>Goal time</th>
        <th>Time spent</th>
        <th>In Progress</th>
      </tr>
    </thead>
    <tbody>
      ${history}
    </tbody>
    `;
  }
}

export default Pagination;
