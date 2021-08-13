
<template>
  <v-form>
    <v-container>
      <v-card width="255px" class="px-5">
        <v-card-title class="d-flex justify-center">基数変換</v-card-title>
          <v-row>
            <v-col cols="12">
              <v-text-field label="16進数" v-model="radix16" :rules="radix16Rule" />
              <v-text-field label="10進数" v-model="radix10" :rules="radix10Rule" />
              <v-text-field label="2進数" v-model="radix2" :rules="radix2Rule" />
            </v-col>
          </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import * as StringUtil from '../../sub/helper/StringUtil'

export default {
  data() {
    return {
      radixData16: '',
      radixData10: '',
      radixData2: '',
      radix16Rule: [
        value => {
          const pattern = /^(?:0[xX])?[0-9a-fA-F]+$/
          return StringUtil.patternTest(pattern, value)
        }
      ],
      radix10Rule: [
        value => {
          const pattern = /[+-]?[0-9]+$/
          return StringUtil.patternTest(pattern, value)
        }
      ],
      radix2Rule: [
        value => {
          const pattern = /^[01]+$/
          return StringUtil.patternTest(pattern, value)
        }
      ]
    }
  },

  computed: { // TODO: 小数点やマイナス値にも対応する
    radix16: {
      get() {
        return this.radixData16
      },
      set(value) {
        this.radixData16 = value
        this.radixData10 = StringUtil.scaleNumber(value, 10)
        this.radixData2 = StringUtil.scaleNumber(value, 2)
      }
    },
    radix10: {
      get() {
        return this.radixData10
      },
      set(value) {
        this.radixData10 = value
        this.radixData16 = StringUtil.scaleNumber(value, 16)
        this.radixData2 = StringUtil.scaleNumber(value, 2)
      }
    },
    radix2: {
      get() {
        return this.radixData2
      },
      set(value) {
        this.radixData2 = value
        this.radixData16 = StringUtil.scaleNumber(value, 16)
        this.radixData10 = StringUtil.scaleNumber(value, 10)
      }
    }
  },

  methods: {
  }
}
</script>
