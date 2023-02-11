import view from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const previousbtn = `
    <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
    </button>
    `;

    const nextbtn = `
    <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;

    // page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return nextbtn;
    }

    // Last page
    if (curPage === numPages && curPage !== 1) {
      return previousbtn;
    }

    // Other page
    if (curPage < numPages) {
      return previousbtn + nextbtn;
    }

    // page 1, and there are no other pages
    return '';
  }
}

export default new PaginationView();
