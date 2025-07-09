class User {
  constructor(id, name, friends = []) {
    this.id = id;
    this.name = name;
    this.friends = friends;
  }

  addFriend(friendId) {
    if (!this.friends.includes(friendId) && friendId !== this.id) {
      this.friends.push(friendId);
    }
  }

  removeFriend(friendId) {
    this.friends = this.friends.filter(id => id !== friendId);
  }

  get friendCount() {
    return this.friends.length;
  }
}

let users = loadFromStorage() || [];

function saveToStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}

function loadFromStorage() {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data).map(u => new User(u.id, u.name, u.friends)) : [];
}

function asyncAction(action) {
  return new Promise(resolve => {
    setTimeout(() => resolve(action()), 500);
  });
}

const userList = document.getElementById("userList");

function renderUsers() {
  userList.innerHTML = "";
  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <h3>${user.name} (ID: ${user.id})</h3>
      <p>Friends: ${user.friends.join(", ") || "No friends"}</p>
      <input type="number" placeholder="Friend ID" class="friendIdInput" />
      <br />
      <button onclick="handleAddFriend(${user.id})">Add friend</button>
      <button onclick="handleRemoveFriend(${user.id})">Delete friend</button>
      <button onclick="handleRemoveUser(${user.id})">Delete user</button>
    `;
    userList.appendChild(card);
  });
}

function handleAddFriend(userId) {
  asyncAction(() => {
    const userCard = [...document.querySelectorAll(".user-card")].find(c =>
      c.querySelector("h3").textContent.includes(`ID: ${userId}`)
    );
    const select = userCard.querySelector(".friendIdInput");
    const friendId = parseInt(select.value);

    const user = users.find(u => u.id === userId);
    const friend = users.find(u => u.id === friendId);
    if (user && friend && friendId !== userId) {
      user.addFriend(friendId);
      friend.addFriend(userId);
    }

    saveToStorage();
    renderUsers();
  });
}

function handleRemoveFriend(userId) {
  asyncAction(() => {
    const userCard = [...document.querySelectorAll(".user-card")].find(c =>
      c.querySelector("h3").textContent.includes(`ID: ${userId}`)
    );
    const select = userCard.querySelector(".friendIdInput");
    const friendId = parseInt(select.value);

    const user = users.find(u => u.id === userId);
    const friend = users.find(u => u.id === friendId);
    if (user && friend) {
      user.removeFriend(friendId);
      friend.removeFriend(userId);
    }

    saveToStorage();
    renderUsers();
  });
}


function handleRemoveUser(userId) {
  asyncAction(() => {
    users = users.filter(u => u.id !== userId);
    users.forEach(u => u.removeFriend(userId));
    saveToStorage();
    renderUsers();
  });
}

document.getElementById("addUserForm").addEventListener("submit", e => {
  e.preventDefault();
  const id = parseInt(document.getElementById("userId").value);
  const name = document.getElementById("userName").value;
  asyncAction(() => {
    if (!users.find(u => u.id === id)) {
      users.push(new User(id, name));
      saveToStorage();
      renderUsers();
      e.target.reset();
    } else {
      alert("User with this ID already existis");
    }
  });
});


function groupByFriendCount() {
  return users.reduce((acc, user) => {
    const count = user.friendCount;
    if (!acc[count]) acc[count] = [];
    acc[count].push(user);
    return acc;
  }, {});
}

function getUniqueFriendIds() {
  const ids = new Set();
  users.forEach(u => u.friends.forEach(id => ids.add(id)));
  return [...ids];
}

function getUsersWithCommonFriend(friendId) {
  return users.filter(user => user.friends.includes(friendId));
}

function getUsersWithMoreFriendsThan(n) {
  return users.filter(user => user.friendCount > n);
}

function getUsersWithNoFriends() {
  return users.filter(user => user.friendCount === 0);
}

renderUsers();


const analysisResults = document.getElementById("analysisResults");

function showNoFriends() {
  const list = getUsersWithNoFriends();
  analysisResults.innerHTML = renderAnalysis("User without friends", list);
}

function showGroupedByFriendCount() {
  const groups = groupByFriendCount();
  let html = `<h3>Grouping by number of friends</h3>`;
  for (const count in groups) {
    html += `<p><strong>${count} friends:</strong> ${groups[count].map(u => `${u.name} (ID: ${u.id})`).join(", ")}</p>`;
  }
  analysisResults.innerHTML = html;
}

function showMoreThanNFriends(event) {
  event.preventDefault();
  const n = parseInt(document.getElementById("moreThanInput").value);
  const list = getUsersWithMoreFriendsThan(n);
  analysisResults.innerHTML = renderAnalysis(`Users more than ${n} friends`, list);
}

function showUsersWithCommonFriend(event) {
  event.preventDefault();
  const id = parseInt(document.getElementById("commonFriendInput").value);
  const list = getUsersWithCommonFriend(id);
  analysisResults.innerHTML = renderAnalysis(`Users with mutual friends (ID: ${id})`, list);
}

function renderAnalysis(title, list) {
  if (list.length === 0) return `<h3>${title}</h3><p>No data</p>`;
  return `
    <h3>${title}</h3>
    <ul>
      ${list.map(u => `<li>${u.name} (ID: ${u.id}), friends: ${u.friendCount}</li>`).join("")}
    </ul>
  `;
}
