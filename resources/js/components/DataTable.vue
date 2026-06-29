<template>
  <div class="table-responsive">
    <table class="table align-middle table-hover mb-0">
      <thead class="table-light text-secondary font-monospace small uppercase">
        <tr>
          <th v-if="selectable" style="width: 40px;">
            <input 
              type="checkbox" 
              class="form-check-input shadow-none" 
              :checked="allSelected" 
              @change="toggleSelectAll" 
            />
          </th>
          <th 
            v-for="col in columns" 
            :key="col.key" 
            :style="col.style || {}"
            :class="[col.class || '', { 'cursor-pointer': col.sortable }]"
            @click="col.sortable && sort(col.key)"
          >
            <div class="d-flex align-items-center gap-1">
              {{ col.label }}
              <i 
                v-if="col.sortable && sortKey === col.key" 
                class="bi small" 
                :class="sortOrder === 'asc' ? 'bi-sort-up' : 'bi-sort-down'"
              ></i>
            </div>
          </th>
          <th v-if="$slots.actions" class="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="totalColumns" class="text-center py-5">
            <div class="spinner-border spinner-border-sm text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <span class="ms-2 text-muted small">Loading records...</span>
          </td>
        </tr>
        <tr v-else-if="items.length === 0">
          <td :colspan="totalColumns" class="text-center py-5">
            <i class="bi-database-exclamation text-muted display-4 mb-2 d-block"></i>
            <span class="text-muted fw-semibold">No records found</span>
          </td>
        </tr>
        <tr v-else v-for="(item, index) in items" :key="item.id || index">
          <td v-if="selectable">
            <input 
              type="checkbox" 
              class="form-check-input shadow-none" 
              :checked="selectedIds.includes(item.id)" 
              @change="toggleSelectRow(item.id)" 
            />
          </td>
          <td v-for="col in columns" :key="col.key" :class="col.class || ''">
            <slot :name="`col-${col.key}`" :item="item" :value="item[col.key]">
              {{ item[col.key] }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="text-end">
            <div class="d-inline-flex gap-1 justify-content-end">
              <slot name="actions" :item="item"></slot>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  name: 'DataTable',
  props: {
    columns: { type: Array, required: true }, // [{ key: 'id', label: 'ID', sortable: true, class: '', style: {} }]
    items: { type: Array, required: true },
    loading: { type: Boolean, default: false },
    selectable: { type: Boolean, default: false },
    selectedIds: { type: Array, default: () => [] }
  },
  emits: ['sort', 'update:selectedIds'],
  setup(props, { emit }) {
    const sortKey = ref('');
    const sortOrder = ref('asc');

    const totalColumns = computed(() => {
      let count = props.columns.length;
      if (props.selectable) count++;
      return count;
    });

    const allSelected = computed(() => {
      return props.items.length > 0 && props.selectedIds.length === props.items.length;
    });

    const toggleSelectRow = (id) => {
      const selected = [...props.selectedIds];
      const index = selected.indexOf(id);
      if (index > -1) {
        selected.splice(index, 1);
      } else {
        selected.push(id);
      }
      emit('update:selectedIds', selected);
    };

    const toggleSelectAll = (e) => {
      if (e.target.checked) {
        emit('update:selectedIds', props.items.map(item => item.id));
      } else {
        emit('update:selectedIds', []);
      }
    };

    const sort = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
      }
      emit('sort', { key: sortKey.value, order: sortOrder.value });
    };

    return {
      totalColumns,
      allSelected,
      sortKey,
      sortOrder,
      toggleSelectRow,
      toggleSelectAll,
      sort
    };
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
