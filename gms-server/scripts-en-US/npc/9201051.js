/**
 * 9201051 - John Barricade (original) + Welcome NPC (custom)
 *
 * Rota B (server-only, sem mexer no cliente): este e' um override en-US.
 * O arquivo base scripts/npc/9201051.js NAO e' alterado.
 *
 * O script e' TRAVADO POR MAPA:
 *   - mapa 10000 (Maple Road / Mushroom Town)  -> NPC de boas-vindas (custom)
 *   - qualquer outro mapa                       -> John Barricade original (intacto)
 *
 * Assim o "John Barricade" do mapa 600020000 (New Leaf City) continua igual.
 * Registro: claude/NPCS-CRIADOS.md  (NPC #1)
 */

var WELCOME_MAP = 10000; // Maple Road / Mushroom Town

function start() {
    if (cm.getMapId() == WELCOME_MAP) {
        // ===== Welcome NPC (custom) — texto do seu welcome.js, edite a vontade =====
        cm.sendOk("Welcome to Maple World! Server #bDevMS V83#k.\r\n\r\nGlad to have you here. Enjoy your adventure!");
        cm.dispose();
        return;
    }

    // ===== John Barricade original (mapa 600020000) — NAO alterar =====
    cm.sendOk("The patrol in New Leaf City is always ready. No creatures are able to break through to the city.");
    cm.dispose();
}
