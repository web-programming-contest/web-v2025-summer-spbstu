"use strict";

class Team
{
    name = "";
    members = [];

    constructor (name)
    {
        this.name = name;
    }

    addMember(member)
    {
        if (typeof(member) !== "object" || member === null || !member.name || !member.role)
        {
            alert("Неверный формат объекта.");
        }
        else
        {
            if (this.members.some(obj => obj.name === member.name))
                {
                    alert("Участник с таким именем уже есть в команде.");
                }
                else
                {
                    this.members.push(member);
                    alert("Участник " + member.name + " успешно добавлен в команду.");
                }
        }
        
    }
    removeMember(name)
    {
        if (this.members.some(obj => obj.name === name))
        {
            this.members = this.members.filter(obj => obj.name != name);
            alert("Участник " + name + " успешно удален.");
        }
        else
        {
            alert("Данного участника не было в команде.");
        }
    }

    get memberCount()
    {
        return this.members.length;
    }
}

function groupByRole (array)
{
    let groups = {};
    
    for (let obj of array) {
        for (let person of obj.members)
        {
            let key = person.role;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(person.name);
        }
    }
    
    return groups;
    //return Object.values(groups);
}
function getUniqueRoles (array)
{
    let currentResult = array.flatMap(obj => obj.members.map(person => person.role));
    let currentSet = new Set(currentResult);
    return [...currentSet];
}
function groupByCount (array)
{
    let groups = {};
    
    for (let obj of array) {
        let key = obj.memberCount;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(obj);
    }
    
    return groups;
    //return Object.values(groups);
}
function getByName(array, name)
{
    let result = array.filter(obj => obj.members.some(person => person.name === name));
    return result;
}
function getAllMembers(array)
{
    let currentResult = array.flatMap(obj => obj.members.map(person => person.name));
    let currentSet = new Set(currentResult);
    return [...currentSet];
}
