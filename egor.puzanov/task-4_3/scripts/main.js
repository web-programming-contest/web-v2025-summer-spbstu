const GrayScreenMain = document.getElementById("GrayScreen1");
const loader = document.getElementById("loader");
let DictRecepies = {};
let Images = {};
const ArrayRecepies = [];
let SetOfIngredients = [];

//затемнение при прекращении выбора карточки
document.getElementById("addRecepie").style.opacity = 0;
GrayScreenMain.addEventListener("click", (e) => {
  cardClicked = document.getElementsByClassName("cardClicked")[0];
  cardClicked
    .querySelectorAll(".cardInput.add")
    .forEach((input) => input.classList.remove("add"));
  cardClicked.classList = ["OuterCard"];
  GrayScreenMain.classList.toggle("unhidden");

  checkIngrFilter(cardClicked);
});

document.addEventListener("DOMContentLoaded", async (e) => {
  // localStorage.clear();
  // localStorage.setItem("DictRecepies", JSON.stringify({"рецепт 3": new Recepie("рецепт 3", ['ингредиент 1', 'ингредиент 4', 'ингредиент 3'], ['шаг 1', 'шаг 2', 'шаг 3'])}))
  // localStorage.setItem("images", JSON.stringify({"рецепт 3": ""}));

  // получение данных
  const answer = await Promise.all([GETRECEPIES(), GETIMAGES()]).then(
    (data) => {
      return data;
    }
  );
  Images = answer[1] || {};
  const recepiesFromStorage = answer[0] || {};
  loader.style.opacity = 0;
  document.getElementById("addRecepie").style.opacity = 1;

  const grid = document.getElementById("forTable1");
  Array.from(Object.keys(recepiesFromStorage)).forEach((key) => {
    const recepie = new Recepie(
      key,
      recepiesFromStorage[key].ingredients,
      recepiesFromStorage[key].steps
    );
    ArrayRecepies.push(recepie);
    DictRecepies[key] = recepie;
    grid.appendChild(createCard(recepie));
  });

  //Затемнение при выборе карточки

  const collection = Array.from(document.getElementsByClassName("OuterCard"));
  collection.forEach((el) =>
    el.addEventListener("click", (e) => {
      const div = e.currentTarget;
      if (Array.from(div.classList).includes("cardClicked")) {
        return;
      }
      const coords = div.getBoundingClientRect();
      const val = window.innerWidth / 10 - coords.left;
      const val2 = window.innerHeight / 20 - coords.top;
      div.style.setProperty("--val", `${val - 20}px`);
      div.style.setProperty("--val2", `${val2}px`);
      div.classList.add("cardClicked");
      GrayScreenMain.classList.add("unhidden");
      setTimeout(() => {
        const coords = div.getBoundingClientRect();
        const left = (coords.left / window.innerWidth) * 100;
        const top = (coords.top / window.innerHeight) * 100;
        div.style.setProperty("--left", `${left}vw`);
        div.style.setProperty("--top", `${top}vh`);
        div.classList.add("part2");
      }, 800);
    })
  );

  //ниже все по выпадающим спискам

  const ingredientDiv = document.getElementById("objectOptions");
  const ingredientsSet = getIngredientSet(ArrayRecepies);
  SetOfIngredients = ingredientsSet;

  //выбор по ингредиентам
  ingredientsSet.forEach((ingredient) => {
    const newObject = document.createElement("button");
    newObject.classList.add("dropdownBtn");
    newObject.classList.add("objectBtn");
    newObject.id = `filterIng-${ingredient.replace(" ", "_")}`;
    newObject.textContent = ingredient;
    addListenerIng(newObject);
    ingredientDiv.appendChild(newObject);
  });

  // кнопка "убрать фильтр по ингредиетам"
  document
    .querySelector(".objectBtn.specialBtn")
    .addEventListener("click", (e) => {
      // убирает подписи о фильтрации
      const headers = document.querySelectorAll(".FilterIngr");
      Array.from(headers).forEach((div) => {
        div.remove();
      });
      const ingredient = e.currentTarget.textContent;
      document.getElementById("listObjectBtn").textContent = ingredient;
      const cards = document.querySelectorAll(".OuterCard");

      cards.forEach((card) => (card.style.display = "block"));

      const tabels = document.querySelectorAll(".forTable");
      Array.from(tabels).forEach((table) => {
        if (
          table.style.display === "none" &&
          Array.from(table.children).some(
            (card) => card.style.display !== "none"
          )
        ) {
          table.style.display = "grid";
          //добавление заголовков к таблицам, что появились полсе убирания фильтра
          const groupFilt =
            document.querySelector("#listSourceBtn").textContent;
          if (groupFilt === "Сгруппировать по кол-ву ингредиентов") {
            const num = table.id.split("-")[1];
            const header = document.createElement("h2");
            header.classList.add("groupStep");
            header.textContent = `Количество ингредиентов: ${num}`;
            document.querySelector("main").insertBefore(header, table);
          } else if (groupFilt === "Сгруппировать по кол-ву шагов") {
            const num = table.id.split("-")[1];
            const header = document.createElement("h2");
            header.classList.add("groupStep");
            header.textContent = `Количество шагов: ${num}`;
            document.querySelector("main").insertBefore(header, table);
          }
        }
      });
    });

  const dropDowns = Array.from(document.getElementsByClassName("dropdown"));

  // появение и исчезание списков
  for (let i = 0; i < dropDowns.length; ++i) {
    dropDowns[i].addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = dropDowns[i].children[0].style.display === "flex";
      dropDowns[i].children[0].style.display = isOpen ? "none" : "flex";
    });

    dropDowns[i].addEventListener("mouseleave", function () {
      setTimeout(() => {
        if (!dropDowns[i].children[0].matches(":hover")) {
          dropDowns[i].children[0].style.display = "none";
        }
      }, 200);
    });
  }

  //группировка по шагам/ингредиентам
  const groups = Array.from(document.getElementsByClassName("sourceBtn"));

  for (let i = 0; i < groups.length; ++i) {
    groups[i].addEventListener("click", (e) => {
      const grouping = e.currentTarget.textContent;
      document.getElementById("listSourceBtn").textContent = grouping; //меняем текст на кнопке
      //убрирает заголовки
      const headers = document.querySelectorAll("h2");
      Array.from(headers).forEach((div) => {
        div.remove();
      });
      switch (grouping) {
        case "Без группировки": {
          //все в первый контейнер
          const grids = document.querySelectorAll(".forTable");
          for (let i = grids.length - 1; i > 0; --i) {
            Array.from(grids[i].children).forEach((child) => {
              grids[0].appendChild(child);
            });
            grids[i].remove();
          }
          const ingrFiltr =
            document.querySelector("#listObjectBtn").textContent;
          if (ingrFiltr !== "Все ингрeдиенты") {
            //если есть фильтр
            const header = document.createElement("h2");
            header.classList.add("FilterIngr");
            header.textContent = `Рецепты, содержащие: ${ingrFiltr}`;
            document.querySelector("main").app;
            document.querySelector("main").prepend(header);
          }
          grids[0].style.display = "grid";
          return;
        }
        case "Сгруппировать по кол-ву ингредиентов": {
          const groups = groupByIngredientsLen(ArrayRecepies);
          Array.from(Object.keys(groups)).forEach((key) => {
            const forTable = document.createElement("div"); //контейнер для каждой группы
            forTable.id = `forTable-${key}`;
            forTable.classList.add("forTable");
            groups[key].forEach((recepie) => {
              forTable.appendChild(
                document.getElementById(
                  `card-${recepie.title.replace(" ", "_")}`
                )
              );
            });

            if (
              Array.from(forTable.children).every(
                (el) => el.style.display === "none"
              )
            ) {
              //если в группе все не подходят под фильтр по ингредиенту
              forTable.style.display = "none";
            } else {
              const header = document.createElement("h2");
              header.classList.add("groupStep");
              header.textContent = `Количество ингредиентов: ${key}`;
              document.querySelector("main").insertBefore(header, loader);
              const ingrFiltr =
                document.querySelector("#listObjectBtn").textContent;
              if (ingrFiltr !== "Все ингрeдиенты") {
                const header = document.createElement("h2");
                header.classList.add("FilterIngr");
                header.textContent = `Рецепты, содержащие: ${ingrFiltr}`;
                document.querySelector("main").insertBefore(header, loader);
              }
            }
            document.querySelector("main").insertBefore(forTable, loader);
          });
          const grids = document.querySelectorAll(".forTable");
          Array.from(grids).forEach((div) => {
            //удаляем пустые
            if (div.children.length === 0) {
              div.remove();
            }
          });
          return;
        }

        case "Сгруппировать по кол-ву шагов": {
          //все то же самое, что и выше, но по шагам
          const groups = groupByStepsLen(ArrayRecepies);
          Array.from(Object.keys(groups)).forEach((key) => {
            const forTable = document.createElement("div");
            forTable.id = `forTable-${key}`;
            forTable.classList.add("forTable");
            groups[key].forEach((recepie) => {
              forTable.appendChild(
                document.getElementById(
                  `card-${recepie.title.replace(" ", "_")}`
                )
              );
            });

            if (
              Array.from(forTable.children).every(
                (el) => el.style.display === "none"
              )
            ) {
              forTable.style.display = "none";
            } else {
              const header = document.createElement("h2");
              header.classList.add("groupStep");
              header.textContent = `Количество шагов: ${key}`;
              document.querySelector("main").insertBefore(header, loader);
              const ingrFiltr =
                document.querySelector("#listObjectBtn").textContent;
              if (ingrFiltr !== "Все ингрeдиенты") {
                const header = document.createElement("h2");
                header.classList.add("FilterIngr");
                header.textContent = `Рецепты, содержащие: ${ingrFiltr}`;
                document.querySelector("main").insertBefore(header, loader);
              }
            }
            document.querySelector("main").insertBefore(forTable, loader);
          });
          const grids = document.querySelectorAll(".forTable");
          Array.from(grids).forEach((div) => {
            if (div.children.length === 0) {
              div.remove();
            }
          });
          return;
        }
        default: {
          throw new Error("что-то пошло не так");
        }
      }
    });
  }
});

//сам процесс фильтрации по ингредиенту
function addListenerIng(div) {
  div.addEventListener("click", (e) => {
    const headers = document.querySelectorAll("h2"); //убираем заголовки
    Array.from(headers).forEach((header) => {
      header.remove();
    });

    const ingredient = e.currentTarget.textContent;
    document.getElementById("listObjectBtn").textContent = ingredient; //меняем текст на кнопке

    const filtered = fillterByIngredient(ArrayRecepies, ingredient);
    const cards = document.querySelectorAll(".OuterCard");

    cards.forEach((card) => {
      //если карточка рецепта из отфильтрованных
      if (
        filtered.some(
          (recepie) => card.id === `card-${recepie.title.replace(" ", "_")}`
        )
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    const grids = document.querySelectorAll(".forTable");
    Array.from(grids).forEach((table) => {
      if (
        Array.from(table.children).every((el) => el.style.display === "none")
      ) {
        //если нет отображаемых карточек
        table.style.display = "none";
      } else {
        table.style.display = "grid";
        const groupFilt = document.querySelector("#listSourceBtn").textContent; //добавление заголовков
        if (groupFilt === "Сгруппировать по кол-ву ингредиентов") {
          const num = table.id.split("-")[1];
          const header = document.createElement("h2");
          header.classList.add("groupStep");
          header.textContent = `Количество ингредиентов: ${num}`;
          document.querySelector("main").insertBefore(header, table);
        } else if (groupFilt === "Сгруппировать по кол-ву шагов") {
          const num = table.id.split("-")[1];
          const header = document.createElement("h2");
          header.classList.add("groupStep");
          header.textContent = `Количество шагов: ${num}`;
          document.querySelector("main").insertBefore(header, table);
        }
        const header = document.createElement("h2");
        header.classList.add("FilterIngr");
        header.textContent = `Рецепты, содержащие: ${ingredient}`;
        document.querySelector("main").insertBefore(header, table);
      }
    });
  });
}

//кнопка создания рецептов
document.getElementById("addRecepie").addEventListener("click", (e) => {
  const div = createForm();
  addForm(div);
});

//добавление контейнера с формой на страницу
function addForm(div) {
  const grid = document.querySelector(".forTable");
  grid.appendChild(div);
  const GrayScreen2 = document.getElementById("GrayScreen2"); //серый экран без реакции на нажатие
  const coords = div.getBoundingClientRect();
  const val = window.innerWidth / 10 - coords.left;
  const val2 = window.innerHeight / 20 - coords.top;
  div.style.setProperty("--val", `${val - 20}px`);
  div.style.setProperty("--val2", `${val2}px`);
  div.classList.add("cardClicked");
  GrayScreen2.classList.add("unhidden");
  setTimeout(() => {
    const coords = div.getBoundingClientRect();
    const left = (coords.left / window.innerWidth) * 100;
    const top = (coords.top / window.innerHeight) * 100;
    div.style.setProperty("--left", `${left}vw`);
    div.style.setProperty("--top", `${top}vh`);
    div.classList.add("part2");
  }, 800);
}

//проверка что после редактирования ингредиентов карточка должна отображаться
function checkIngrFilter(div) {
  const filtering = document.getElementById("listObjectBtn").textContent;
  if (filtering === "Все ингрeдиенты") {
    return;
  }

  const ingredients = Array.from(div.querySelector("ul").children);

  if (
    ingredients.every((li) => li.querySelector("p").textContent !== filtering)
  ) {
    div.style.display = "none";

    const currentTable = div.parentElement;
    if (
      Array.from(currentTable.children).every(
        (el) => el.style.display === "none"
      )
    ) {
      const possibleHeader = currentTable.previousSibling;
      if (possibleHeader.tagName === "H2") {
        if (possibleHeader.previousSibling.tagName === "H2") {
          possibleHeader.previousSibling.remove();
        }
        possibleHeader.remove();
      }
      currentTable.style.display = "none";
    }
  }
}
