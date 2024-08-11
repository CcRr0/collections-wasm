use wasm_bindgen::JsValue;
use std::cmp::Ordering;

pub struct Item<T> {
    pub(crate) key: T,
    pub(crate) value: JsValue,
}

impl<T: Ord> Ord for Item<T> {
    fn cmp(&self, other: &Self) -> Ordering {
        self.key.cmp(&other.key)
    }
}

impl<T: Ord> PartialOrd for Item<T> {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl<T: PartialEq> Eq for Item<T> {}

impl<T: PartialEq> PartialEq for Item<T> {
    fn eq(&self, other: &Self) -> bool {
        self.key == other.key
    }
}
