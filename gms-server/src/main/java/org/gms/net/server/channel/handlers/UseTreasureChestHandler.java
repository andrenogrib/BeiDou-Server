package org.gms.net.server.channel.handlers;

import org.gms.client.Client;
import org.gms.client.inventory.InventoryType;
import org.gms.client.inventory.Item;
import org.gms.client.inventory.manipulator.InventoryManipulator;
import org.gms.constants.game.GameConstants;
import org.gms.net.AbstractPacketHandler;
import org.gms.net.packet.InPacket;
import org.gms.server.ItemInformationProvider;
import org.gms.util.PacketCreator;

import java.util.ArrayList;
import java.util.List;

public final class UseTreasureChestHandler extends AbstractPacketHandler {

    @Override
    public final void handlePacket(InPacket p, Client c) {

        final short slot = p.readShort();
        final int itemid = p.readInt();

        final Item toUse = c.getPlayer().getInventory(InventoryType.ETC).getItem((byte) slot);
        if (toUse == null || toUse.getQuantity() <= 0 || toUse.getItemId() != itemid) {
            c.sendPacket(PacketCreator.enableActions());
            return;
        }

        if (!c.getPlayer().isAlive()) {
            c.sendPacket(PacketCreator.enableActions());
            return;
        }
        int reward;
        int keyIDforRemoval;
        String box;
        String keyname = "";

        switch (toUse.getItemId()) {
            case 4280000:
                reward = GameConstants.selectRandomReward(GameConstants.goldrewards);
                keyIDforRemoval = 5490000;
                box = "Gold Treasure Chest";
                break;
            case 4280001:
                reward = GameConstants.selectRandomReward(GameConstants.goldrewards);
                keyIDforRemoval = 5490001;
                box = "Silver Treasure Chest";
                break;
            default:
                return;
        }

        // 得到的數量
        int amount = 1;
        keyname = ItemInformationProvider.getInstance().getName(keyIDforRemoval);
        switch (reward) {
            case 2000004:
                amount = 200;
                break;
            case 2000005:
                amount = 100;
                break;
        }

        if (c.getPlayer().getInventory(InventoryType.CASH).countById(keyIDforRemoval) > 0) {
            if (c.getPlayer().getInventory(InventoryType.EQUIP).getNextFreeSlot() > -1 && c.getPlayer().getInventory(InventoryType.USE).getNextFreeSlot() > -1 && c.getPlayer().getInventory(InventoryType.SETUP).getNextFreeSlot() > -1 && c.getPlayer().getInventory(InventoryType.ETC).getNextFreeSlot() > -1) {


                InventoryManipulator.removeFromSlot(c, InventoryType.ETC, (byte) slot, (short) 1, true);
                InventoryManipulator.removeById(c, InventoryType.CASH, keyIDforRemoval, 1, true, false);
                c.sendPacket(PacketCreator.getShowItemGain(reward, (short) amount, true));
                c.sendPacket(PacketCreator.UseTreasureBox(toUse.getItemId()));
            } else {
                c.getPlayer().dropMessage(5, "One of your inventory tabs is full. Please make room before opening " + box + "!");
                c.sendPacket(PacketCreator.enableActions());
            }
        } else {
            c.getPlayer().dropMessage(5, "Please make sure you have " + keyname);
            c.sendPacket(PacketCreator.enableActions());
        }

    }

}
