package org.gms.client.command;

/**
 * Runtime toggle for the GM "map id + name" feedback that is shown whenever a GM
 * enters a map (see {@code MapleMap#addPlayer}).
 *
 * <p>State lives in memory only: it defaults to ON at every server boot and is flipped
 * at runtime with the {@code @mapinfo} command (no rebuild needed to toggle). Mirrors
 * {@link GmNpcInfo}.
 */
public final class GmMapInfo {
    private static volatile boolean enabled = true;

    private GmMapInfo() {
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
