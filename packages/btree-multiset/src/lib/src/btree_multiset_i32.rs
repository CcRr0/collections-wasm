use wasm_bindgen::prelude::*;
use std::collections::{BTreeMap, btree_map};

#[wasm_bindgen]
pub struct BinaryTreeMultiSetInt32 {
    map: BTreeMap<i32, usize>,
}

#[wasm_bindgen]
impl BinaryTreeMultiSetInt32 {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            map: BTreeMap::new(),
        }
    }

    #[wasm_bindgen]
    pub fn contains(&self, value: i32) -> bool {
        self.map.contains_key(&value)
    }

    #[wasm_bindgen]
    pub fn count(&self, value: i32) -> usize {
        *self.map.get(&value).unwrap_or(&0)
    }

    #[wasm_bindgen]
    pub fn first_unwrap(&self) -> i32 {
        *self.map.first_key_value().unwrap().0
    }

    #[wasm_bindgen]
    pub fn last_unwrap(&self) -> i32 {
        *self.map.last_key_value().unwrap().0
    }

    #[wasm_bindgen]
    pub fn range_first(&self, min: i32, max: i32) -> Option<i32> {
        self.map.range(min..=max).next().map(|(value, _)| *value)
    }

    #[wasm_bindgen]
    pub fn range_last(&self, min: i32, max: i32) -> Option<i32> {
        self.map.range(min..=max).next_back().map(|(value, _)| *value)
    }

    #[wasm_bindgen]
    pub fn insert(&mut self, value: i32) -> () {
        self.map.entry(value).and_modify(|count| *count += 1).or_insert(1);
    }

    #[wasm_bindgen]
    pub fn pop_first_unwrap(&mut self) -> i32 {
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
    pub fn pop_last_unwrap(&mut self) -> i32 {
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
    pub fn remove(&mut self, value: i32) -> bool {
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
