export const changeLabelAndName = (data, value, label) => {
  if(!Array.isArray(data)) return
  const pickerData = [];
  data.length && data.forEach(item => {
    pickerData.push({
      label: item[label],
      value: item[value]
    })
  })
  return pickerData
}

export const handlerWaste = (data) => {
  const wasteArray = []
  data && data.forEach( item => {
    let wasteItem = {}
    for (const key in item) {
      switch (key) {
        case 'name':
          wasteItem = {
            title: '固废名称',
            name: item[key],
            children: []
          }
          break;
        case 'source':
          wasteItem.children.push({title: '固废来源', name: item['source']})
          break;
        case 'storage_location':
          wasteItem.children.push({title: '储存地址', name: item['storage_location']})
          break;
        case 'quantity':
          wasteItem.children.push({title: '固废吨数', name: item['quantity']})
          break;
        case 'note':
          wasteItem.children.push({title: '备注', name: item['note']})
          break;
        default:
          break;
      }
    }
    wasteArray.push(wasteItem)
  })
  return wasteArray
}
