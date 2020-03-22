<template>
  <div>
    <section class="container-fluid content__header">
      <h4 class="c-grey-900 mT-10 mB-20">Услуги</h4>
      <div class="card">
        <div class="card-body">
          <div class="row mT-10">
            <div class="col-md-6">
              <button class="btn btn-sm btn-primary add-btn">
                Добавить услугу
              </button>
            </div>
            <div class="col-md-6">
              <form name="searchForm" class="search-form">
                <label class="input-group">
                  <input placeholder="Поиск" aria-controls="dataTable" />
                  <button class="btn btn-sm btn-primary">Искать</button>
                </label>
              </form>
            </div>
          </div>
          <div class="row">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First</th>
                  <th>Last</th>
                  <th>Handle</th>
                  <th>#</th>
                  <th>First</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <th>1</th>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" class="btn btn-success">
                        Success
                      </button>
                      <button type="button" class="btn btn-warning">
                        Warning
                      </button>
                      <button type="button" class="btn btn-danger">
                        Danger
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <th>1</th>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" class="btn btn-success">
                        Success
                      </button>
                      <button type="button" class="btn btn-warning">
                        Warning
                      </button>
                      <button type="button" class="btn btn-danger">
                        Danger
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                  <th>1</th>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" class="btn btn-success">
                        Success
                      </button>
                      <button type="button" class="btn btn-warning">
                        Warning
                      </button>
                      <button type="button" class="btn btn-danger">
                        Danger
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "proposals"
};
</script>
