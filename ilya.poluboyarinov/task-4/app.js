let teams = [];
let currentTeamIndex = -1;

const teamsContainer = document.getElementById('teamsContainer');
const addTeamBtn = document.getElementById('addTeamBtn');
const teamModal = document.getElementById('teamModal');
const memberModal = document.getElementById('memberModal');
const removeMemberModal = document.getElementById('removeMemberModal');
const teamNameInput = document.getElementById('teamName');
const memberNameInput = document.getElementById('memberName');
const memberRoleInput = document.getElementById('memberRole');
const removeMemberNameInput = document.getElementById('removeMemberName');

document.addEventListener('DOMContentLoaded', () => {
    loadTeams();
    renderTeams();
    setupEventListeners();
});

function loadTeams()
{
    let savedTeams = localStorage.getItem('teams');
    if (savedTeams)
        {
        let parsedTeams = JSON.parse(savedTeams);
        teams = parsedTeams.map(teamData => {
            let team = new Team(teamData.name);
            team.members = teamData.members;
            return team;
        });
    }
}


function saveTeams()
{
    localStorage.setItem('teams', JSON.stringify(teams));
}

function renderTeams()
{
    teamsContainer.innerHTML = '';
    
    if (teams.length === 0)
    {
        teamsContainer.innerHTML = '<p>Нет созданных команд. Добавьте первую команду.</p>';
        return;
    }
    
    teams.forEach((team, index) => {
        let teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        
        let teamHeader = document.createElement('div');
        teamHeader.className = 'team-header';
        
        let teamName = document.createElement('div');
        teamName.className = 'team-name';
        teamName.textContent = team.name;
        
        let memberCount = document.createElement('div');
        memberCount.className = 'member-count';
        memberCount.textContent = `${team.memberCount} участников`;
        
        teamHeader.appendChild(teamName);
        teamHeader.appendChild(memberCount);
        
        let membersList = document.createElement('ul');
        membersList.className = 'members-list';
        
        team.members.forEach(member => {
            let memberItem = document.createElement('li');
            memberItem.className = 'member-item';
            
            let memberName = document.createElement('span');
            memberName.className = 'member-name';
            memberName.textContent = member.name;
            
            let memberRole = document.createElement('span');
            memberRole.className = 'member-role';
            memberRole.textContent = member.role;
            
            memberItem.appendChild(memberName);
            memberItem.appendChild(memberRole);
            membersList.appendChild(memberItem);
        });
        
        let buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';
        
        let addMemberBtn = document.createElement('button');
        addMemberBtn.className = 'add-member-btn';
        addMemberBtn.textContent = 'Добавить участника';
        addMemberBtn.addEventListener('click', () => openMemberModal(index));
        
        let removeMemberBtn = document.createElement('button');
        removeMemberBtn.className = 'remove-member-btn';
        removeMemberBtn.textContent = 'Удалить участника';
        removeMemberBtn.addEventListener('click', () => openRemoveMemberModal(index));
        
        let removeTeamBtn = document.createElement('button');
        removeTeamBtn.className = 'remove-member-btn';
        removeTeamBtn.textContent = 'Удалить команду';
        removeTeamBtn.addEventListener('click', () => removeTeam(index));
        
        buttonsContainer.appendChild(addMemberBtn);
        buttonsContainer.appendChild(removeMemberBtn);
        buttonsContainer.appendChild(removeTeamBtn);
        
        teamCard.appendChild(teamHeader);
        teamCard.appendChild(membersList);
        teamCard.appendChild(buttonsContainer);
        
        teamsContainer.appendChild(teamCard);
    });
}

function setupEventListeners()
{
    addTeamBtn.addEventListener('click', () => {
        teamModal.style.display = 'block';
        teamNameInput.value = '';
    });
    
    document.getElementById('saveTeamBtn').addEventListener('click', () => {
        let name = teamNameInput.value.trim();
        if (name)
        {
            addTeam(name);
            teamModal.style.display = 'none';
        }
        else
        {
            alert('Введите название команды');
        }
    });
    
    document.getElementById('cancelTeamBtn').addEventListener('click', () => {
        teamModal.style.display = 'none';
    });
    
    document.getElementById('saveMemberBtn').addEventListener('click', () => {
        let name = memberNameInput.value.trim();
        let role = memberRoleInput.value.trim();
        
        if (name && role)
        {
            addMember(currentTeamIndex, {name, role});
            memberModal.style.display = 'none';
        }
        else
        {
            alert('Заполните все поля');
        }
    });
    
    document.getElementById('cancelMemberBtn').addEventListener('click', () => {
        memberModal.style.display = 'none';
    });
    
    document.getElementById('confirmRemoveMemberBtn').addEventListener('click', () => {
        let name = removeMemberNameInput.value.trim();
        
        if (name)
        {
            removeMember(currentTeamIndex, name);
            removeMemberModal.style.display = 'none';
        }
        else
        {
            alert('Введите имя участника');
        }
    });
    
    document.getElementById('cancelRemoveMemberBtn').addEventListener('click', () => {
        removeMemberModal.style.display = 'none';
    });
    
    // Закрытие по клику
    let closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
}

function openMemberModal(teamIndex)
{
    currentTeamIndex = teamIndex;
    memberModal.style.display = 'block';
    memberNameInput.value = '';
    memberRoleInput.value = '';
}

function openRemoveMemberModal(teamIndex)
{
    currentTeamIndex = teamIndex;
    removeMemberModal.style.display = 'block';
    removeMemberNameInput.value = '';
}

function addTeam(name)
{
    new Promise((resolve, reject) => {
        if (teams.some(team => team.name === name))
        {
            reject('Команда с таким именем уже существует');
        }
        else
        {
            let team = new Team(name);
            teams.push(team);
            saveTeams();
            resolve();
        }
    })
    .then(() => {
        renderTeams();
    })
    .catch(error => {
        alert(error);
    });
}

function removeTeam(index)
{
    new Promise((resolve, reject) => {
        if (index >= 0 && index < teams.length)
        {
            teams.splice(index, 1);
            saveTeams();
            resolve();
        }
        else
        {
            reject('Неверный индекс команды');
        }
    })
    .then(() => {
        renderTeams();
    })
    .catch(error => {
        alert(error);
    });
}

function addMember(teamIndex, member)
{
    new Promise((resolve, reject) => {
        if (teamIndex >= 0 && teamIndex < teams.length) {
            try
            {
                teams[teamIndex].addMember(member);
                saveTeams();
                resolve();
            }
            catch (error)
            {
                reject(error);
            }
        }
        else
        {
            reject('Неверный индекс команды');
        }
    })
    .then(() => {
        renderTeams();
    })
    .catch(error => {
        alert(error);
    });
}

function removeMember(teamIndex, name)
{
    new Promise((resolve, reject) => {
        if (teamIndex >= 0 && teamIndex < teams.length) {
            try
            {
                teams[teamIndex].removeMember(name);
                saveTeams();
                resolve();
            }
            catch (error)
            {
                reject(error);
            }
        }
        else
        {
            reject('Неверный индекс команды');
        }
    })
    .then(() => {
        renderTeams();
    })
    .catch(error => {
        alert(error);
    });
}