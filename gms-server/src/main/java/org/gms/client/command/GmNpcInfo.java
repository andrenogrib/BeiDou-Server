package org.gms.client.command;

/**
 * Runtime toggle for the GM "NPC id + script" feedback that is shown whenever a GM
 * opens an NPC -- either by clicking it (see NPCTalkHandler) or through a command/script
 * that calls openNpc (see AbstractPlayerInteraction#openNpc).
 *
 * <p>State lives in memory only: it defaults to ON at every server boot and is flipped
 * at runtime with the {@code @npcinfo} command (no rebuild needed to toggle).
 */
public final class GmNpcInfo {
    private static volatile boolean enabled = true;

    private GmNpcInfo() {
    }

    public static boolean isEnabled() {
        return enabled;
    }

    public static void setEnabled(boolean value) {
        enabled = value;
    }

    /** Flip the flag and return the new state. */
    public static boolean toggle() {
        enabled = !enabled;
        return enabled;
    }
}
