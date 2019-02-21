import SpellService from "./spellService.js";

let _ss = new SpellService()

function drawSpellApi() {
    let template = ''
    _ss.SpellsApi.forEach(s => {
        template += `
        <li onclick="app.controllers.spellController.getDetails('${s.url}')">${s.name}</li>
        `
    })
    document.querySelector('#api-spells').innerHTML = template
}

function drawActiveSpell() {
    let button = ` <button class="btn btn-danger" onclick="app.controllers.spellController.addSpell()">Add to Spellbook</button>`
    document.querySelector('#active-spell').innerHTML = _ss.ActiveSpell.getTemplate(button)
}

function drawSpellbook() {
    let template = ''
    let mySpells = _ss.MySpellBook
    mySpells.forEach(s => {
        let button = `<button class="btn btn-danger" onclick="app.controllers.spellController.removeSpell('${s._id}')">Remove from Spellbook</button>`
        template += s.getSpellBookTemplate(button)
    })
    document.querySelector('#my-spellbook').innerHTML = template
}

export default class SpellController {
    constructor() {
        _ss.addSubscriber('spellsApi', drawSpellApi)
        _ss.addSubscriber('activeSpell', drawActiveSpell)
        _ss.addSubscriber('mySpellBook', drawSpellbook)
        _ss.getSpellData()
    }

    getDetails(url) {
        _ss.getDetails(url)
    }

    showDetails(id) {
        _ss.showDetails(id)
    }

    addSpell() {
        _ss.addSpell()
    }

    removeSpell(id) {
        _ss.removeSpell(id)
    }
}