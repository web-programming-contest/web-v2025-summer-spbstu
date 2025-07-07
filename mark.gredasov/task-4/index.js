class Team {
    constructor(name, members = []) {
        if (typeof name !== 'string' || !Array.isArray(members)) {
            throw new Error("Одно или несколько полей команды " + name + " " + members + " имеют неверный тип");
        }
        this.name = name;
        this.members = members;
    }

    addMember(member) {
        if (typeof member !== 'object' || !member.name || !member.role) {
            throw new Error("Участник должен быть объектом c полями name и role");
        }

        const existingMember = this.members.some(m => m.name === member.name);
        if (existingMember) {
            throw new Error("Участник с таким именем уже был добавлен в эту команду");
        }

        this.members.push(member);
    }

    removeMember(name) {
        this.members = this.members.filter(member => member.name !== name);
        return this;
    }

    memberCount() {
        return this.members.length;
    }
}


function groupByRoles(...teams) {
    const result = new Map();

    teams.flatMap(team => team.members).forEach(member => {
        if (result.has(member.role)) {
            result.get(member.role).push(member.name);
        } else {
            result.set(member.role, [member.name]);
        }
    });

    return result;
}

function getUniqueRoles(...teams) {
    const roles = new Set();
    teams.flatMap(team => team.members).forEach(member => roles.add(member.role));

    return roles;
}

function groupByNumberOfMembers(...teams) {
    const groups = new Map();

    teams.forEach(team => {
        const count = team.members.length;
        if (groups.has(count)) {
            groups.get(count).push(team.name);
        } else {
            groups.set(count, [team.name]);
        }
    });

    return groups;
}

function getTeamsWithCurrentMember(name, ...teams) {
    const teamsWithMembers = new Map();
    teams.forEach(team => teamsWithMembers.set(team.name, team.members.map(member => member.name)));
    
    const result = [];
    teamsWithMembers.forEach(function(team, index) {
        if (team.includes(name)) {
            result.push(index);
        }
    })

    return result;
}

function getListOfMembers(...teams) {
    const memberNames = new Set();
    teams.flatMap(team => team.members.map(member => member.name)).forEach(name => memberNames.add(name));

    return memberNames;
}

try {
    const members1 = [
        { name: "Mark", role: "Designer" },
        { name: "Ivan", role: "Programmer" },
        { name: "Mayya", role: "Dancer" }
    ];

    const members2 = [
        { name: "Peter", role: "Artist" },
        { name: "Timur", role: "Programmer" },
        { name: "Pavel", role: "Engineer" }
    ];

    const dreamTeam = new Team("Team 1", members1);
    const dreamTeam2 = new Team("Team 2", members2);

    dreamTeam.addMember({ name: "Maksim", role: "Scientist" });
    dreamTeam.addMember({ name: "Pavel", role: "Teacher" });


    let allGroupsByRoles = groupByRoles(dreamTeam, dreamTeam2);
    let roles = getUniqueRoles(dreamTeam, dreamTeam2);
    let allGroupsByNumberOfMembers = groupByNumberOfMembers(dreamTeam, dreamTeam2);
    let teamsWithCurrentMember = getTeamsWithCurrentMember("Pavel", dreamTeam, dreamTeam2);
    let listOfMembers = getListOfMembers(dreamTeam, dreamTeam2);

    console.log(allGroupsByRoles);
    console.log(roles);
    console.log(allGroupsByNumberOfMembers);
    console.log(teamsWithCurrentMember);
    console.log(listOfMembers);

} catch (error) {
    console.log(error);
}


const timeout = 100;

function createTeamCard(teamName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const teamCard = document.createElement('div');
                teamCard.className = "teamCard";
                teamCard.dataset.name = teamName;

                teamCard.innerHTML = '<h3>' + teamName + '</h3>' + `
                    <span class='membersCount'> Участников: <span class='membersCountNumber'> 0 </span> </span>
                    <div class='memberInputsContainer'> </div>
                `

                document.getElementById('createdTeams').appendChild(teamCard);

                const existingCards = JSON.parse(localStorage.getItem('teamCards') || '[]');
                if (!existingCards.includes(teamName)) {
                    existingCards.push(teamName);
                    localStorage.setItem('teamCards', JSON.stringify(existingCards));
                }

                resolve(teamCard);
            } catch (error) {
                reject(error);
            }
        }, timeout);
    });
}

function deleteTeamCard(teamName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const teamCards = document.querySelectorAll('.teamCard');

                let result = false;

                for (const card of teamCards) {
                    if (card.dataset.name === teamName) {
                        card.remove();
                        result = true;
                    }
                }

                const existingCards = JSON.parse(localStorage.getItem('teamCards'));
                const updatedCards = existingCards.filter(name => name !== teamName);
                localStorage.setItem('teamCards', JSON.stringify(updatedCards));

                resolve(result);
            } catch (error) {
                reject(error);
            }
        }, timeout);
    });
}

function updateNumberOfMembersInTheCard(team) {
    const teamCard = document.querySelector(`.teamCard[data-name="${team.name}"]`);
    const number = teamCard.querySelector('.membersCountNumber');
    number.textContent = team.memberCount();
}

function addMemberToTheCard(teamName, memberName, memberRole) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const teamCard = document.querySelector(`.teamCard[data-name="${teamName}"]`);
                const membersContainer = teamCard.querySelector('.memberInputsContainer');

                const member = document.createElement('div');
                member.className = "memberInfo";
                member.dataset.memberName = memberName;
                member.innerHTML = memberName + ' - ' + memberRole;

                membersContainer.appendChild(member);

                resolve(true);
            } catch (error) {
                reject(error);
            }
        }, timeout);
    });
}

function deleteMemberFromTheCard(teamName, memberName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const teamCard = document.querySelector(`.teamCard[data-name="${teamName}"]`);
                if (!teamCard) {
                    resolve(false);
                }

                const members = teamCard.querySelectorAll('.memberInfo');
                let removed = false;

                members.forEach(member => {
                    if (member.dataset.memberName === memberName) {
                        member.remove();
                        removed = true;
                    }
                });

                resolve(removed);
            } catch (error) {
                reject(error);
            }
        }, timeout);
    });
}


let teamName = document.querySelector('#teamName');
let addTeamButton = document.querySelector('#addTeam');
let deleteTeamButton = document.querySelector('#deleteTeam');

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const teamCards = JSON.parse(localStorage.getItem('teamCards') || '[]');

        for (let teamName of teamCards) {
            await createTeamCard(teamName);

            const teamData = localStorage.getItem(teamName);
            if (teamData) {
                const team = new Team(JSON.parse(teamData).name, JSON.parse(teamData).members);
                updateNumberOfMembersInTheCard(team);
            
                for (let member of team.members) {
                    await addMemberToTheCard(teamName, member.name, member.role);
                }
            }
        }
    } catch (error) {
        alert(error.message);
    }
});

addTeamButton.addEventListener('click', async function() {
    try {
        const name = teamName.value.trim();
        if (!name) {
            throw new Error('Введите название команды, прежде чем добавлять ее');
        }

        if (localStorage.getItem(name) !== null) {
            throw new Error('Команда с таким названием уже существует');
        }

        await createTeamCard(name);
        localStorage.setItem(name, JSON.stringify(new Team(name, [])));
    } catch (error) {
        alert(error.message);
    }
});

deleteTeamButton.addEventListener('click', async function() {
    try {
        const name = teamName.value.trim();
        if (!name) {
            throw new Error('Введите название команды, прежде чем удалять ее');
        }

        if (localStorage.getItem(name) !== null) {
            await deleteTeamCard(name);
            localStorage.removeItem(name);
        } else {
            throw new Error('Команды с таким названием нет, удаление невозможно');
        }
    } catch(error) {
        alert(error.message);
    }
});


let memberName = document.querySelector('#memberName');
let memberRole = document.querySelector('#memberRole');
let addMemberButton = document.querySelector('#addMember');
let deleteMemberButton = document.querySelector('#deleteMember');

addMemberButton.addEventListener('click', async function() {
    try {
        const teamNameValue = teamName.value.trim();
        const memberNameValue = memberName.value.trim();
        const memberRoleValue = memberRole.value.trim();
        
        if (!teamNameValue || !memberNameValue || !memberRoleValue) {
            throw new Error("Все поля должны быть заполнены");
        }

        const teamFromLocalStorage = localStorage.getItem(teamNameValue);
        if (!teamFromLocalStorage) {
            throw new Error('Команда с таким названием не найдена');
        }
    
        const teamData = JSON.parse(teamFromLocalStorage);
        const team = new Team(teamData.name, teamData.members);
        team.addMember({name: memberNameValue, role: memberRoleValue});
        localStorage.setItem(teamNameValue, JSON.stringify(team));

        await addMemberToTheCard(teamNameValue, memberNameValue, memberRoleValue);
        updateNumberOfMembersInTheCard(team);

    } catch (error) {
        alert(error.message);
    } finally {
        memberName.value = "";
        memberRole.value = "";
    }
});

deleteMemberButton.addEventListener('click', async function() {
    try {
        const teamNameValue = teamName.value.trim();
        const memberNameValue = memberName.value.trim();
        const teamFromLocalStorage = localStorage.getItem(teamNameValue);

        if (!teamFromLocalStorage) {
            throw new Error('Команда с таким названием не найдена');
        }

        const teamData = JSON.parse(teamFromLocalStorage);
        const team = new Team(teamData.name, teamData.members);
        team.removeMember(memberNameValue);
        localStorage.setItem(teamNameValue, JSON.stringify(team));
        if (deleteMemberFromTheCard(teamData.name, memberNameValue)) {
            updateNumberOfMembersInTheCard(team);
        } else {
            throw new Error('Участник не был найден в команде');
        }
    } catch (error) {
        alert(error.message);
    } finally {
        memberName.value = "";
        memberRole.value = "";
    }
});