use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct SegmentTreeInt32 {
    seg: Vec<i32>,
    n: usize,
}

#[wasm_bindgen]
impl SegmentTreeInt32 {
    #[wasm_bindgen(constructor)]
    pub fn new(init: Vec<i32>) -> Self {
        let n: usize = init.len();
        let mut seg: Vec<i32> = vec![0; n << 1];
        seg[n..].copy_from_slice(&init);
        let mut i: usize = n - 1;
        while i != 0 {
            seg[i] = seg[i << 1] + seg[i << 1 | 1];
            i -= 1;
        }
        Self {
            seg,
            n,
        }
    }

    #[wasm_bindgen]
    pub fn query(&self, mut l: usize, mut r: usize) -> i32 {
        let mut res: i32 = 0;
        l += self.n;
        r += self.n;
        while l < r {
            if l & 1 != 0 {
                res += self.seg[l];
                l += 1;
            }
            if r & 1 != 0 {
                r -= 1;
                res += self.seg[r];
            }
            l >>= 1;
            r >>= 1;
        }
        res
    }

    #[wasm_bindgen]
    pub fn update(&mut self, mut i: usize, v: i32) -> () {
        self.seg[self.n + i] = v;
        i += self.n;
        while i != 0 {
            self.seg[i >> 1] = self.seg[i] + self.seg[i ^ 1];
            i >>= 1;
        }
    }
}
