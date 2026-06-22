<template>
  <a-card class="general-card">
    <a-space>
      <a-space>
        <a-button
          :disabled="condition.onSale === 1"
          type="primary"
          status="success"
          @click="changeOnSaleFilter(1)"
        >
          {{ $t('cashShop.table.filter.onSale') }}
        </a-button>
        <a-button
          :disabled="condition.onSale === 0"
          type="primary"
          status="danger"
          @click="changeOnSaleFilter(0)"
        >
          {{ $t('cashShop.table.filter.pendingSale') }}
        </a-button>
        <a-button
          :disabled="condition.onSale === undefined"
          type="primary"
          @click="changeOnSaleFilter(undefined)"
        >
          {{ $t('cashShop.table.filter.all') }}
        </a-button>
      </a-space>
      <a-space class="a-input">
        <a-input-number
          v-model="condition.itemId"
          :placeholder="$t('cashShop.table.placeholder.itemId')"
          @keydown.enter="loadData"
        />
      </a-space>
      <a-space>
        <a-button @click="loadData">{{ $t('button.search') }}</a-button>
        <a-button type="primary" @click="showBatchForm">
          {{ $t('cashShop.table.batchEdit') }}
        </a-button>
      </a-space>
    </a-space>
    <a-table
      v-model:selectedKeys="selectedKeys"
      row-key="sn"
      :loading="loading"
      :data="tableData"
      column-resizable
      :pagination="false"
      :bordered="{ cell: true }"
      :scroll="{ x: 2000 }"
      :row-selection="rowSelection"
    >
      <template #columns>
        <a-table-column
          title="SN"
          data-index="sn"
          align="center"
          :width="100"
        />
        <a-table-column
          :title="$t('cashShop.table.column.itemIcon')"
          align="center"
          :width="70"
        >
          <template #cell="{ record }">
            <img
              :src="getIconUrl('item', record.itemId)"
              :alt="record.itemId"
            />
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('cashShop.table.column.itemId')"
          data-index="itemId"
          align="center"
          :width="100"
        />
        <a-table-column
          :title="$t('cashShop.table.column.itemName')"
          data-index="itemName"
          align="center"
          :width="140"
        />
        <a-table-column
          :title="$t('cashShop.table.column.count')"
          data-index="count"
          align="center"
          :width="70"
        />
        <a-table-column
          :title="$t('cashShop.table.column.priority')"
          data-index="priority"
          align="center"
          :width="80"
        />
        <a-table-column
          :title="$t('cashShop.table.column.price')"
          data-index="price"
          align="center"
          :width="80"
        />
        <a-table-column title="Bonus" data-index="bonus" align="center" />
        <a-table-column
          :title="$t('cashShop.table.column.period')"
          data-index="period"
          align="center"
          :width="80"
        >
          <template #cell="{ record }">
            {{ record.period }} {{ $t('cashShop.table.period.days') }}
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('cashShop.table.column.maplePoint')"
          data-index="maplePoint"
          align="center"
        />
        <a-table-column
          :title="$t('cashShop.table.column.meso')"
          data-index="meso"
          align="center"
        />
        <a-table-column
          :title="$t('cashShop.table.column.forPremiumUser')"
          data-index="forPremiumUser"
          align="center"
        />
        <a-table-column
          :title="$t('cashShop.table.column.gender')"
          data-index="gender"
          align="center"
          :width="80"
        >
          <template #cell="{ record }">
            <a-tag v-if="record.gender === 0" color="blue">
              {{ $t('cashShop.table.gender.male') }}
            </a-tag>
            <a-tag v-else-if="record.gender === 1" color="red">
              {{ $t('cashShop.table.gender.female') }}
            </a-tag>
            <a-tag v-else-if="record.gender === 2" color="green">
              {{ $t('cashShop.table.gender.unisex') }}
            </a-tag>
          </template>
        </a-table-column>
        <a-table-column
          :title="$t('cashShop.table.column.onSale')"
          data-index="onSale"
          align="center"
          :width="90"
        >
          <template #cell="{ record }">
            <a-tag v-if="record.onSale" color="green">
              {{ $t('cashShop.table.onSale') }}
            </a-tag>
            <a-tag v-else color="red">
              {{ $t('cashShop.table.pendingSale') }}
            </a-tag>
          </template>
        </a-table-column>
        <a-table-column :title="$t('cashShop.table.column.tag')" align="center">
          <template #cell="{ record }">
            <a-tag v-if="record.clz === 0" color="gold">NEW</a-tag>
            <a-tag v-else-if="record.clz === 1" color="green">SALE</a-tag>
            <a-tag v-else-if="record.clz === 2" color="orangered">HOT</a-tag>
            <a-tag v-else-if="record.clz === 3" color="blue">EVENT</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="Limit" data-index="limit" align="center" />
        <a-table-column title="PbCash" data-index="pbCash" align="center" />
        <a-table-column title="PbPoint" data-index="pbPoint" align="center" />
        <a-table-column title="PbGift" data-index="pbGift" align="center" />
        <a-table-column
          :title="$t('cashShop.table.column.packageSn')"
          data-index="packageSn"
          align="center"
        />
        <a-table-column :title="$t('operation')">
          <template #cell="{ record }">
            <a-button type="text" size="mini" @click="editClick(record)">
              {{ $t('button.edit') }}
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-pagination
      style="margin-top: 20px"
      :total="total"
      :current="condition.pageNo"
      show-total
      show-jumper
      @change="pageChange"
    />
  </a-card>
  <cash-shop-form ref="cashShopFormRef" @load-data="loadData" />
  <a-modal
    v-model:visible="batchFormVisible"
    :ok-loading="loading"
    :title="$t('cashShop.table.batchForm.title')"
    :on-before-ok="handleBatchFormBeforeOk"
  >
    <a-form :model="batchFormData">
      <a-form-item :label="$t('cashShop.table.batchForm.selectedSn')">
        <a-space wrap>
          <a-tag v-for="sn in selectedKeys" :key="sn" color="blue">
            {{ sn }}
          </a-tag>
        </a-space>
      </a-form-item>
      <a-form-item :label="$t('cashShop.table.batchForm.editType')">
        <a-select v-model="batchFormData.type">
          <a-option
            v-for="item of batchFormTypeOptions"
            :key="item.value"
            :value="item.value"
            :label="$t(item.label)"
          />
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('cashShop.table.batchForm.value')">
        <a-input-number v-model="batchFormData.value" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    batchFormState,
    batchOnSale,
    conditionState,
    getCommodityByCategory,
  } from '@/api/cashShop';
  import CashShopForm from '@/views/game/cashShop/form.vue';
  import { cashShopState } from '@/store/modules/cashShop/type';
  import { getIconUrl } from '@/utils/mapleStoryAPI';
  import { Message, TableRowSelection } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const { loading, setLoading } = useLoading(false);

  const props = defineProps<{
    topId: string | number;
    subId?: string | number;
  }>();
  const tableData = ref<cashShopState[]>([]);
  const total = ref<number>(0);
  const condition = ref<conditionState>({
    id: 1,
    subId: 0,
    onSale: 1,
    pageNo: 1,
    itemId: undefined,
  });

  const selectedKeys = ref([]);

  const rowSelection = reactive<TableRowSelection>({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: true,
  });

  const pageChange = (data: number) => {
    condition.value.pageNo = data;
    loadData();
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await getCommodityByCategory(condition.value);
      tableData.value = data.records;
      total.value = data.totalRow;
    } finally {
      setLoading(false);
    }
  };
  condition.value.id = props.topId as number;
  condition.value.subId = props.subId as number;
  loadData();

  const changeOnSaleFilter = (data: undefined | 0 | 1) => {
    condition.value.onSale = data;
    loadData();
  };

  const cashShopFormRef = ref();
  const editClick = (data: cashShopState) => {
    cashShopFormRef.value.initForm(data);
  };

  const batchFormVisible = ref<boolean>(false);
  const showBatchForm = () => {
    batchFormData.value = {
      data: [],
      type: '价格',
      value: undefined,
    };
    selectedKeys.value.forEach((k) => {
      tableData.value.forEach((d) => {
        if (d.sn === k) {
          batchFormData.value.data.push(d);
        }
      });
    });
    batchFormVisible.value = true;
  };
  const batchFormTypeOptions = [
    { value: '价格', label: 'cashShop.table.batchForm.type.price' },
    { value: '数量', label: 'cashShop.table.batchForm.type.count' },
    { value: '有效期', label: 'cashShop.table.batchForm.type.period' },
  ];
  const batchFormData = ref<batchFormState>({
    data: [],
    type: '价格',
    value: undefined,
  });
  const handleBatchFormBeforeOk = async () => {
    if (batchFormData.value.data.length === 0) {
      Message.error(t('cashShop.table.batchForm.nothingSelected'));
      return;
    }
    if (batchFormData.value.value === undefined) {
      Message.error(t('cashShop.table.batchForm.valueUndefined'));
      return;
    }

    setLoading(true);
    try {
      await batchOnSale(batchFormData.value);
      Message.success(t('cashShop.table.updateSuccess'));
      await loadData();
    } finally {
      setLoading(false);
    }
  };
</script>

<script lang="ts">
  export default {
    name: 'CashShopTable',
  };
</script>

<style scoped lang="less">
  :deep(.arco-card-body .a-input .arco-space-item) {
    width: 100%;
  }
  :deep(.arco-card-body .arco-space) {
    flex-wrap: wrap;
    width: 100%;
  }
  :deep(.arco-card-body > .arco-space > .arco-space-item) {
    margin-bottom: 5px;
    margin-right: 0px;
  }
  :deep(.arco-card-body > .arco-space > .arco-space-item:nth-child(2)) {
    width: 100%;
    max-width: 400px;
  }
  :deep(.arco-card-body .arco-space .arco-space-item .arco-input-wrapper) {
    width: 100%;
  }
</style>
