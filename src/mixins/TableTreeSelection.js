import deepCopy from '@/utils/deepCopy';
//this.treeData
//this.selectedRowKeys

export default {
    methods: {
        onTableTreeSelect(record, selected, selectedRows) {
            console.log(record, selected, selectedRows)

            let selectedTreeKeys = [record.id];
            selectedRows.forEach(row => {
                selectedTreeKeys.push(
                    ...this.getCurrentSubTreeKeys(row.id)
                )
            });
            selectedTreeKeys = Array.from(new Set(selectedTreeKeys.filter(key => key)));
            console.log('selectedTreeKeys', selectedTreeKeys);
            this.rowSelection.selectedRowKeys = deepCopy(selectedTreeKeys);
            this.selectedRowKeys = deepCopy(selectedTreeKeys);

            if (!selected) {
                let keys = this.getCurrentSubTreeKeys(record.id);
                keys = Array.from(new Set(keys.filter(key => key)));
                console.log('keys', keys)
                deepCopy(selectedTreeKeys).forEach((key, index) => {
                    console.log('keys.includes(key)', key, keys.includes(key))
                    if (keys.includes(key)) {
                        this.rowSelection.selectedRowKeys[index] = '';
                        this.selectedRowKeys[index] = '';
                    }
                });
                this.rowSelection.selectedRowKeys = Array.from(new Set(this.rowSelection.selectedRowKeys.filter(key => key)));
                this.selectedRowKeys = Array.from(new Set(this.selectedRowKeys.filter(key => key)));
            }
            console.log('selectedTreeKeys', selectedTreeKeys)
            console.log('this.selectedRowKeys', this.selectedRowKeys, this.rowSelection.selectedRowKeys)
        },
        getCurrentSubTreeRows(id) {
            let { data, currentItem } = this.getSelectedData(id, this.treeData);
            let rows = this.getAllTreeRows(data);
            console.log('rows', rows);
            rows = [currentItem, ...data];
            return rows;
        },
        getSelectedData(id, data = []) {
            let tmpData = [];
            let currentItem = {};
            data.forEach(item => {
                if (item.id == id) {
                    tmpData = item.children || [];
                    currentItem = item || {};
                }
                if (item.children && item.children.length > 0) {
                    this.getSelectedData(id, item.children);
                }
            })
            return {
                data: tmpData,
                currentItem,
            };
        },
        getAllTreeRows(data, selectedRows = []) {
            data.forEach(item => {
                selectedRows.push(item);
                if (item.children && item.children.length > 0) {
                    this.getAllTreeRows(item.children, selectedRows);
                }
            });
            return selectedRows;
        },
        getCurrentSubTreeKeys(id) {
            let data = this.getSelectedSubData(id, this.treeData);
            console.log('getCurrentSubTreeKeys data', data);
            let selectedKeys = this.getAllTreeKeys(data);
            console.log('getCurrentSubTreeKeys selectedKeys', selectedKeys)
            selectedKeys = [id, ...selectedKeys];
            return selectedKeys;
        },
        getSelectedSubData(id, data = []) {
            let tmpData = [];
            data.forEach(item => {
                if (item.id == id) {
                    tmpData = item.children || [];
                }
                if (item.children && item.children.length > 0) {
                    this.getSelectedSubData(id, item.children);
                }
            })
            return tmpData;
        },
        getAllTreeKeys(data = [], selectedKeys = []) {
            data.forEach(item => {
                selectedKeys.push(item.id);
                if (item.children && item.children.length > 0) {
                    this.getAllTreeKeys(item.children, selectedKeys)
                }
            });
            return selectedKeys;
        },
    }
}