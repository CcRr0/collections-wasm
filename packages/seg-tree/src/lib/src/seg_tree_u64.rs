use wasm_bindgen::prelude::*;
use std::cmp::{max, min};

#[wasm_bindgen]
pub struct SegmentTreeUInt64 {
    seg: Vec<u64>,
    n: usize,
    operator: Box<dyn Fn(u64, u64) -> u64>,
    default: u64,
}

#[wasm_bindgen]
impl SegmentTreeUInt64 {
    #[wasm_bindgen(constructor)]
    pub fn new(init: Vec<u64>, op: u8, modulus: Option<u64>) -> Self {
        let n: usize = init.len();
        let mut seg: Vec<u64> = vec![0; n << 1];

        let operator: Box<dyn Fn(u64, u64) -> u64> = Box::new(move |mut x, mut y|
            match op {
                0 => if let Some(m) = modulus { (x + y) % m } else { x + y },
                1 => max(x, y),
                2 => min(x, y),
                3 => if let Some(m) = modulus { (x * y) % m } else { x * y },
                4 => {
                    while y != 0 {
                        (x, y) = (y, x % y);
                    }
                    x
                }
                5 => x | y,
                6 => x & y,
                7 => x ^ y,
                _ => panic!(),
            }
        );

        seg[n..].copy_from_slice(&init);
        let mut i: usize = n - 1;
        while i != 0 {
            seg[i] = operator(seg[i << 1], seg[i << 1 | 1]);
            i -= 1;
        }

        Self {
            seg,
            n,
            operator,
            default: match op {
                0 => 0,
                1 => u64::MIN,
                2 => u64::MAX,
                3 => 1,
                4 => 0,
                5 => 0,
                6 => u64::MAX,
                7 => u64::MIN,
                _ => panic!(),
            },
        }
    }

    #[wasm_bindgen]
    pub fn query(&self, mut l: usize, mut r: usize) -> u64 {
        let mut res: u64 = self.default;
        l += self.n;
        r += self.n;
        while l < r {
            if l & 1 != 0 {
                res = (self.operator)(res, self.seg[l]);
                l += 1;
            }
            if r & 1 != 0 {
                r -= 1;
                res = (self.operator)(res, self.seg[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        res
    }

    #[wasm_bindgen]
    pub fn update(&mut self, mut i: usize, v: u64) -> () {
        self.seg[self.n + i] = v;
        i += self.n;
        while i != 0 {
            self.seg[i >> 1] = (self.operator)(self.seg[i], self.seg[i ^ 1]);
            i >>= 1;
        }
    }
}
