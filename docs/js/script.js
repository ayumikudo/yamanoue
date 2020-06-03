//バリデーションコンポーネント
Vue.component('errors', {
  props: ['errors'],
  template: `
    <div class="errors" v-if="errors">
      <div class="error" v-for="error in errors">{{ error }}</div>
    </div>
  `
});

//価格のフィルター
Vue.filter('number_format', function (val) {
  return val.toLocaleString();
});

var app = new Vue({
  el: '#app',
  data: {
    //モーダル切り替え
    show: false,

    //モーダルバリデーション
    errors: {
      name: [],
      mail: [],
      tel: [],
      inquiry: []
    },

    //新着物件のチェック状態
    showNewItem: false,
    //並び替えの選択地　1:おすすめ順、2:価格が安い順、3:価格が高い順、4:土地面積が多い順
    sortOder: 1,

    //物件リスト
    products: [
      { id: 1, name: '軽井沢ゴルフ倶楽部隣接の希少な立地', price: 6500, address: '北佐久郡軽井沢町大字軽井沢字長倉往還南原', traffic: '軽井沢駅から車で約3分/約1.8km', area: 265, floor: '2LDK+S', image: 'images/img_1.jpg', isNew: true, favorited: false },
      { id: 2, name: '閑静な別荘地に佇むリフォーム済みの明るい一戸建て', price: 6000, address: '北佐久郡軽井沢町大字長倉字大小丸', traffic: '軽井沢駅から車で6分/約3.1km', area: 371, floor: '3LDK', image: 'images/img_2.jpg', isNew: false, favorited: false },
      { id: 3, name: '自然になじんだ建物の窓から、池がある美しい庭園を望む', price: 29000, address: '北佐久郡軽井沢町大字軽井沢字長倉往還南原', traffic: '軽井沢駅から車で5分/約3.1km', area: 3192, floor: '5LDK', image: 'images/img_3.jpg', isNew: false, favorited: false },
      { id: 4, name: '中軽井沢エリアで人気の三井の森別荘地', price: 1580, address: '北佐久郡軽井沢町大字長倉字水垂', traffic: '軽井沢駅から車で約10分/約6km', area: 40, floor: '4LDK', image: 'images/img_4.jpg', isNew: true, favorited: false },
      { id: 5, name: '雲場池近くのレンガ張り洋風建物', price: 12500, address: '北佐久郡軽井沢町大字軽井沢字雲場橋根', traffic: '軽井沢駅から徒歩で約19分/約1.5km', area: 163, floor: '4LDK', image: 'images/img_5.jpg', isNew: false, favorited: false },
      { id: 6, name: '四季の外気温にとらわれない24時間365日ストレスフリーな新築建物', price: 8700, address: '北佐久郡軽井沢町大字追分字上の原', traffic: '軽井沢駅から車で約15分/約9.3km', area: 64, floor: '2LDK', image: 'images/img_6.jpg', isNew: true, favorited: false },
      { id: 7, name: 'ゆとりのリゾートライフをお過ごしいただけます', price: 23000, address: '北佐久郡軽井沢町大字軽井沢字離山下', traffic: '軽井沢駅から車で約3分/約1.8km', area: 1073, floor: '5SLDK', image: 'images/img_7.jpg', isNew: true, favorited: false },
      { id: 8, name: '天空に舞う大型ゲストハウス 遠く山並みが奇麗に見えます', price: 39800, address: '北佐久郡軽井沢町大字軽井沢', traffic: '軽井沢駅から車で約8分/約6km', area: 118, floor: '5LDK', image: 'images/img_8.jpg', isNew: true, favorited: false },
      { id: 9, name: 'シンメトリーな外観が印象的な４LDKの大型建物', price: 5000, address: '北佐久郡軽井沢町大字長倉字鶴溜', traffic: '軽井沢駅から車で約8分/約5km', area: 354, floor: '4LDK', image: 'images/img_9.jpg', isNew: false, favorited: false }
    ]
  },
  methods: {
    validate: function () {
      var errors = {
        name: [],
        mail: [],
        tel: [],
        inquiry: []
      };
      if (!this.name) {
        errors.name.push('お名前が入力されていません');
      }
      if (!this.mail) {
        errors.mail.push('メールアドレスが入力されていません');
      }
      if (!this.tel) {
        errors.tel.push('電話番号が入力されていません');
      }
      if (!this.inquiry) {
        errors.inquiry.push('お問い合わせ内容が入力されていません');
      }

      this.errors = errors;
    }
  },
  computed: {
    //絞り込み後の物件リストを返す
    filteredList: function () {
      var newList = [];
      for (var i = 0; i < this.products.length; i++) {
        var isShow = true;

        if (this.showNewItem && !this.products[i].isNew) {
          isShow = false;
        }

        if (isShow) {
          newList.push(this.products[i]);
        }
      }

      //新しい配列を並び替える
      if (this.sortOder == 1) {

      }
      else if (this.sortOder == 2) {
        newList.sort(function (a, b) {
          return a.price - b.price;
        });
      }
      else if (this.sortOder == 3) {
        newList.sort(function (a, b) {
          return b.price - a.price;
        });
      }
      else if (this.sortOder == 4) {
        newList.sort(function (a, b) {
          return b.area - a.area;
        });
      }

      //商品リストを返す
      return newList;
    }
  }
});