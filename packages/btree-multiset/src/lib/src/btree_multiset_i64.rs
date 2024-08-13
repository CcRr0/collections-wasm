use wasm_bindgen::prelude::*;
use std::collections::{BTreeMap, btree_map};

#[wasm_bindgen]
pub struct BinaryTreeMultiSetInt64 {
    map: BTreeMap<i64, usize>,
}

#[wasm_bindgen]
impl BinaryTreeMultiSetInt64 {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            map: BTreeMap::new(),
        }
    }

    #[wasm_bindgen]
    pub fn contains(&self, value: i64) -> bool {
        self.map.contains_key(&value)
    }

    #[wasm_bindgen]
    pub fn count(&self, value: i64) -> usize {
        *self.map.get(&value).unwrap_or(&0)
    }

    #[wasm_bindgen]
    pub fn first_unwrap(&self) -> i64 {
        *self.map.first_key_value().unwrap().0
    }

    #[wasm_bindgen]
    pub fn last_unwrap(&self) -> i64 {
        *self.map.last_key_value().unwrap().0
    }

    #[wasm_bindgen]
    pub fn range_first(&self, min: i64, max: i64) -> Option<i64> {
        self.map.range(min..=max).next().map(|(value, _)| *value)
    }

    #[wasm_bindgen]
    pub fn range_last(&self, min: i64, max: i64) -> Option<i64> {
        self.map.range(min..=max).next_back().map(|(value, _)| *value)
    }

    #[wasm_bindgen]
    pub fn insert(&mut self, value: i64) -> () {
        self.map.entry(value).and_modify(|count| *count += 1).or_insert(1);
    }

    #[wasm_bindgen]
    pub fn pop_first_unwrap(&mut self) -> i64 {
        let mut entry = self.map.first_entry().unwrap();
        let value = *entry.key();
        let count = entry.get_mut();
        if *count == 1 {
            entry.remove();
        } else {
            *count -= 1;
        }
        value
    }

    #[wasm_bindgen]
    pub fn pop_last_unwrap(&mut self) -> i64 {
        let mut entry = self.map.last_entry().unwrap();
        let value = *entry.key();
        let count = entry.get_mut();
        if *count == 1 {
            entry.remove();
        } else {
            *count -= 1;
        }
        value
    }

    #[wasm_bindgen]
    pub fn remove(&mut self, value: i64) -> bool {
        if let btree_map::Entry::Occupied(mut entry) = self.map.entry(value) {
            let count = entry.get_mut();
            if *count == 1 {
                entry.remove();
            } else {
                *count -= 1;
            }
            true
        } else { false }
    }

    #[wasm_bindgen]
    pub fn clear(&mut self) -> () {
        self.map.clear();
    }
}
