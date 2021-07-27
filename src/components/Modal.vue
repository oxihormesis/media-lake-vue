<template id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container col-11 col-sm-9 col-md-6 col-lg-5">
          <button class="modal-default-button" @click="$emit('close')">
            <span class="material-icons-outlined">cancel</span>
          </button>
          <div class="px-0 modal-header">
            <slot name="header">Header</slot>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
            <slot name="customContent1"></slot>
          </div>
          <div class="justify-content-center modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  vertical-align: middle;
  margin-top: 30vh;
}

.modal-container {
  margin: 0px auto;
  padding: 40px 60px;
  color: rgb(215, 215, 215);
  background-color: rgb(40, 40, 40);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
}
.modal-footer {
  border: none;
}

.modal-body {
  display: flex;
  justify-content: center;
}

.modal-default-button {
  color: rgb(215, 215, 215);
  position: absolute;
  top: 0;
  right: 0;
  margin: -5px -10px 0 0;
  background: none;
  border: none;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
