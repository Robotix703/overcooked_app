import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { IngredientWithQuantity } from 'src/app/meal/meal.model';
import { PrettyInstruction, Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.page.html',
  styleUrls: ['./follow.page.scss'],
})
export class FollowPage implements OnInit {

  recipeSub: Subscription;
  instructionSub: Subscription;
  recipe: Recipe;
  instructions: PrettyInstruction[];
  recipeId: string;
  composition: IngredientWithQuantity[];
  isLoading: boolean;
  checkedInstructions: number = 0;
  proportion: number;
  currentTimer: Date;
  startTimer: number;
  endTimer: number;
  timer: any;
  timeToDisplay: string;
  toast: any;
  alarm: HTMLAudioElement;

  constructor(private recipeService: RecipeService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private toastController: ToastController) { }

  display(recipe: Recipe, instructions: PrettyInstruction[]){
    this.recipe = recipe;
    this.composition = JSON.parse(recipe.composition);
    this.instructions = instructions.sort(this.sortInstruction);
    this.isLoading = false;
  }

  ngOnInit() {
    this.alarm = new Audio('assets/music/alarm.mp3');

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        this.navCtrl.navigateBack('/home');
        return;
      }
      this.recipeId = paramMap.get('recipeId');

      this.isLoading = true;
      this.recipeSub = this.recipeService.getRecipe(this.recipeId).subscribe(recipeData => {
        this.instructionSub = this.recipeService.getInstructions(this.recipeId).subscribe(instructionData => {
          this.display(recipeData, instructionData);
        });
      });
    });
  }

  sortInstruction(a: PrettyInstruction, b: PrettyInstruction){
    return a.order - b.order;
  }

  onChecked(value: boolean){
    if(value) this.checkedInstructions++;
    else this.checkedInstructions--;

    this.proportion = this.checkedInstructions / this.instructions.length;
  }

  async createTimer(count: number){
    this.startTimer = Date.now();
    let duration = (count * 60 * 1000);
    this.endTimer = this.startTimer + duration;
    this.timer = setInterval(this.timerIntervalFunction, 1000, this.endTimer, this);
    this.timeToDisplay = this.convertSecondsToText(duration/1000);

    this.toast = await this.toastController.create({
      message: this.timeToDisplay,
      duration: duration,
      position: 'bottom',
      buttons: [
        {
          text: '+1 Min',
          role: 'info',
          handler: this.addOneMinute
        },
        {
          text: 'Stop',
          role: 'cancel',
          handler: this.stopTimer
        }
      ]
    });

    await this.toast.present();
  }

  updateTimer(timer: string){
    this.toast.message = timer;
  }

  timerIntervalFunction(endTimer: number, that: any){
    let secondsRemaining = Math.round((endTimer - Date.now())/1000);
    let timerToDisplay = that.convertSecondsToText(secondsRemaining);
    that.updateTimer(timerToDisplay);

    if(secondsRemaining <= 0){
      clearInterval(that.timer);
    }
  }

  convertSecondsToText(seconds: number){
    return (Math.round(seconds/60)) + ":" + (seconds % 60)
  }

  playAlarm(){
    this.alarm.play();
  }

  stopAlarm(){
    this.alarm.pause();
  }

  addOneMinute(){

  }

  stopTimer(this: any){

  }
}
