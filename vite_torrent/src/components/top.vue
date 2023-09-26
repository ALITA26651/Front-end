<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left">
        <svg t="1693822180083" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="1036" width="48" height="48">
          <path
            d="M893.6 350.8c-20.9-49.3-50.7-93.6-88.7-131.6s-82.3-67.9-131.6-88.7C622.1 108.8 567.9 97.8 512 97.8c-55.9 0-110.1 11-161.2 32.6-49.3 20.9-93.6 50.7-131.6 88.7s-67.9 82.3-88.7 131.6C108.8 401.9 97.8 456.1 97.8 512s11 110.1 32.6 161.2c20.9 49.3 50.7 93.6 88.7 131.6s82.3 67.9 131.6 88.7c51.1 21.6 105.3 32.6 161.2 32.6 55.9 0 110.1-11 161.2-32.6 49.3-20.9 93.6-50.7 131.6-88.7s67.9-82.3 88.7-131.6C915 622.1 926 567.9 926 512s-10.8-110.1-32.4-161.2zM762.4 762.4C695.5 829.3 606.6 866.2 512 866.2c-36.7 0-72.6-5.6-106.7-16.3l40-167.4c28.8 4.9 56 7.4 81.3 7.4 29.9 0 57.2-3.4 81.9-10.3 43.7-12.1 79.1-35.5 102.3-67.6 20.5-28.3 31.4-63 31.4-100.3 0-34.6-9.2-70.1-26.7-102.4-19.5-36.1-48-66.2-82.5-87.1-37.9-23-82.3-34-128.2-31.9-84.3 3.9-146.2 31.7-184 82.7-59.8 80.6-33.6 187.6-32.5 192.1 4.1 16.1 20.4 25.8 36.5 21.8 16.1-4.1 25.8-20.3 21.7-36.4-0.2-0.8-20.2-84.5 22.7-142 26.6-35.6 73.1-55.1 138.4-58.2 34.5-1.6 66.2 6.2 94.3 23.2 25.4 15.4 46.4 37.6 60.8 64.3 12.8 23.6 19.5 49.2 19.5 73.8 0 24.6-7 47.1-20 65.2-33.6 46.4-105.5 63.1-202.9 47.1l30.4-127c3.9-16.1-6.1-32.3-22.2-36.2-16.1-3.9-32.3 6.1-36.2 22.2l-82.1 343.7c-31.9-16.6-61.5-38.1-87.6-64.3-66.9-66.8-103.8-155.7-103.8-250.3 0-94.6 36.8-183.5 103.7-250.4s155.8-103.7 250.4-103.7 183.5 36.8 250.4 103.7S866.2 417.4 866.2 512s-36.9 183.5-103.8 250.4z"
            p-id="1037"></path>
        </svg>
        <p>RARBG</p>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <div class="help">
          <p class="help_">游客登录</p>
          <svg t="1693921842199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1186" width="32" height="32">
            <path
              d="M580.0448 603.4944m-232.3968 0a232.3968 232.3968 0 1 0 464.7936 0 232.3968 232.3968 0 1 0-464.7936 0Z"
              fill="#C4F000" p-id="1187"></path>
            <path
              d="M506.88 85.0432a423.9872 423.9872 0 1 0 423.9872 423.9872A424.4992 424.4992 0 0 0 506.88 85.0432z m0 766.0032a342.0672 342.0672 0 1 1 342.0672-342.016A342.4256 342.4256 0 0 1 506.88 851.0464z"
              fill="#333333" p-id="1188"></path>
            <path
              d="M517.12 262.6048a162.9184 162.9184 0 0 0-122.88 44.1856 164.5568 164.5568 0 0 0-51.2 119.5008h81.92a81.92 81.92 0 0 1 87.3984-81.92A81.92 81.92 0 0 1 539.4432 501.76 121.5488 121.5488 0 0 0 465.92 613.12v21.248h81.92v-21.248a39.68 39.68 0 0 1 24.1152-36.3008A163.84 163.84 0 0 0 517.12 262.6048z"
              fill="#333333" p-id="1189"></path>
            <path d="M506.88 722.0224m-44.4928 0a44.4928 44.4928 0 1 0 88.9856 0 44.4928 44.4928 0 1 0-88.9856 0Z"
              fill="#333333" p-id="1190"></path>
          </svg>
        </div>
        <div class="login" v-if="!status">
          <p class="login_">磁力链接</p>
          <svg t="1693923054652" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1005" width="32" height="32">
            <path d="M185.1392 557.824h649.0624v271.36H185.1392z" fill="#C4F000" p-id="1006"></path>
            <path d="M134.656 129.8944v760.32h751.8208V129.8944z m669.9008 678.4H216.576V211.8144h587.9808z"
              fill="#333333" p-id="1007"></path>
            <path
              d="M331.008 313.6h254.1056v81.92H331.008zM331.008 469.0944h352.256v81.92h-352.256zM475.648 624.5888h207.5648v81.92H475.648z"
              fill="#333333" p-id="1008"></path>
          </svg>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
let status = ref<number>(0)


/* const goTor=()=>{
  router.push({
    path: "/torrent"
  })
  status.value = 1
} */

</script>

<style lang="scss" scoped>
.top {
  position: fixed;
  z-index: 998;
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  justify-content: center;
  border-bottom: 1px rgb(237, 225, 225) solid;
  box-shadow: 0px 2px 2px 0px rgb(231, 231, 231);
  background-color: rgba(255,255,255,0.85);

  .content {
    width: 1200px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20px;

      p {
        margin-left: 10px;
        font-size: 36px;
        color: #151515;
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      margin-right: 30px;

      .login {
        display: flex;
        justify-content: center;
        align-items: center;
        transition-property: all;
        transition-duration: 0.2s;

        &:hover {
          cursor: pointer;
          transform: scale(1.01);
          color: darkgray;
        }

        .login_ {
          margin-right: 5px;
          font-size: 16px;

        }
      }

      .help {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        transition-property: all;
        transition-duration: 0.2s;

        &:hover {
          cursor: pointer;
          transform: scale(1.01);
          color: darkgray;
        }

        .help_ {
          margin-right: 5px;
          font-size: 16px;
        }
      }
    }

  }
}</style>