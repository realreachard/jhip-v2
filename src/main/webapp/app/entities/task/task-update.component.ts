import { Component, Vue, Inject } from 'vue-property-decorator';

import JobService from '@/entities/job/job.service';
import { IJob } from '@/shared/model/job.model';

import { ITask, Task } from '@/shared/model/task.model';
import TaskService from './task.service';

const validations: any = {
  task: {
    title: {},
    description: {},
  },
};

@Component({
  validations,
})
export default class TaskUpdate extends Vue {
  @Inject('taskService') private taskService: () => TaskService;
  public task: ITask = new Task();

  @Inject('jobService') private jobService: () => JobService;

  public jobs: IJob[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.taskId) {
        vm.retrieveTask(to.params.taskId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.task.id) {
      this.taskService()
        .update(this.task)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jHipV2App.task.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.taskService()
        .create(this.task)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jHipV2App.task.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    }
  }

  public retrieveTask(taskId): void {
    this.taskService()
      .find(taskId)
      .then(res => {
        this.task = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.jobService()
      .retrieve()
      .then(res => {
        this.jobs = res.data;
      });
  }
}
